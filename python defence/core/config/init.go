package config

import (
	"crypto/tls"
	"encoding/json"
	"goProxy/core/db"
	"goProxy/core/domains"
	"goProxy/core/firewall"
	"goProxy/core/proxy"
	"goProxy/core/server"
	"goProxy/core/utils"
	"net/http/httputil"
	"net/url"
	"os"
	"strings"
	"time"

	"github.com/kor44/gofilter"
)

func Load() {
	file, err := os.Open("config.json")
	if err != nil {
		if os.IsNotExist(err) {
			Generate()
		} else {
			panic(err)
		}
	}
	json.NewDecoder(file).Decode(&domains.Config)

	proxy.Cloudflare = domains.Config.Proxy.Cloudflare

	proxy.CookieSecret = domains.Config.Proxy.Secrets["cookie"]
	proxy.JSSecret = domains.Config.Proxy.Secrets["javascript"]
	proxy.CaptchaSecret = domains.Config.Proxy.Secrets["captcha"]
	proxy.AdminSecret = domains.Config.Proxy.AdminSecret
	proxy.APISecret = domains.Config.Proxy.APISecret

	// Check if the Proxy Timeout Config has been set otherwise use default values

	if domains.Config.Proxy.Timeout.Idle != 0 {
		proxy.IdleTimeout = domains.Config.Proxy.Timeout.Idle
		proxy.IdleTimeoutDuration = time.Duration(proxy.IdleTimeout).Abs() * time.Second
	}

	if domains.Config.Proxy.Timeout.Read != 0 {
		proxy.ReadTimeout = domains.Config.Proxy.Timeout.Read
		proxy.ReadTimeoutDuration = time.Duration(proxy.ReadTimeout).Abs() * time.Second
	}

	if domains.Config.Proxy.Timeout.ReadHeader != 0 {
		proxy.ReadHeaderTimeout = domains.Config.Proxy.Timeout.ReadHeader
		proxy.ReadHeaderTimeoutDuration = time.Duration(proxy.ReadHeaderTimeout).Abs() * time.Second
	}

	if domains.Config.Proxy.Timeout.Write != 0 {
		proxy.WriteTimeout = domains.Config.Proxy.Timeout.Write
		proxy.WriteTimeoutDuration = time.Duration(proxy.WriteTimeout).Abs() * time.Second
	}

	proxy.IPRatelimit = domains.Config.Proxy.Ratelimits["requests"]
	proxy.FPRatelimit = domains.Config.Proxy.Ratelimits["unknownFingerprint"]
	proxy.FailChallengeRatelimit = domains.Config.Proxy.Ratelimits["challengeFailures"]
	proxy.FailRequestRatelimit = domains.Config.Proxy.Ratelimits["noRequestsSent"]

	GetFingerprints("https://raw.githubusercontent.com/41Baloo/balooProxy/main/global/fingerprints/known_fingerprints.json", &firewall.KnownFingerprints)
	GetFingerprints("https://raw.githubusercontent.com/41Baloo/balooProxy/main/global/fingerprints/bot_fingerprints.json", &firewall.BotFingerprints)
	GetFingerprints("https://raw.githubusercontent.com/41Baloo/balooProxy/main/global/fingerprints/malicious_fingerprints.json", &firewall.ForbiddenFingerprints)

	for i, domain := range domains.Config.Domains {
		domains.Domains = append(domains.Domains, domain.Name)

		ipInfo := false
		firewallRules := []domains.Rule{}
		rawFirewallRules := domains.Config.Domains[i].FirewallRules
		for _, fwRule := range domains.Config.Domains[i].FirewallRules {

			if strings.Contains(fwRule.Expression, "ip.country") || strings.Contains(fwRule.Expression, "ip.asn") {
				ipInfo = true
			}
			rule, err := gofilter.NewFilter(fwRule.Expression)
			if err != nil {
				panic("[ " + utils.RedText("!") + " ] [ Error Loading Custom Firewall Rules: " + utils.RedText(err.Error()) + " ]")
			}

			firewallRules = append(firewallRules, domains.Rule{
				Filter: rule,
				Action: fwRule.Action,
			})
		}

		cacheRules := []domains.Rule{}
		rawCacheRules := domains.Config.Domains[i].CacheRules
		for _, caRule := range domains.Config.Domains[i].CacheRules {

			rule, err := gofilter.NewFilter(caRule.Expression)
			if err != nil {
				panic("[ " + utils.RedText("!") + " ] [ Error Loading Custom Cache Rules: " + utils.RedText(err.Error()) + " ]")
			}

			cacheRules = append(cacheRules, domains.Rule{
				Filter: rule,
				Action: caRule.Action,
			})
		}

		dProxy := httputil.NewSingleHostReverseProxy(&url.URL{
			Scheme: domain.Scheme,
			Host:   domain.Backend,
		})
		dProxy.Transport = &server.RoundTripper{}

		var cert tls.Certificate = tls.Certificate{}
		if !proxy.Cloudflare {
			var certErr error
			cert, certErr = tls.LoadX509KeyPair(domain.Certificate, domain.Key)
			if certErr != nil {
				panic("[ " + utils.RedText("!") + " ] [ " + utils.RedText("Error Loading Certificates: "+certErr.Error()) + " ]")
			}
		}

		domains.DomainsMap.Store(domain.Name, domains.DomainSettings{
			Name: domain.Name,

			CustomRules:    firewallRules,
			IPInfo:         ipInfo,
			RawCustomRules: rawFirewallRules,

			CacheRules:    cacheRules,
			RawCacheRules: rawCacheRules,

			DomainProxy:        dProxy,
			DomainCertificates: cert,
			DomainWebhooks: domains.WebhookSettings{
				URL:            domain.Webhook.URL,
				Name:           domain.Webhook.Name,
				Avatar:         domain.Webhook.Avatar,
				AttackStartMsg: domain.Webhook.AttackStartMsg,
				AttackStopMsg:  domain.Webhook.AttackStopMsg,
			},

			BypassStage1:        domain.BypassStage1,
			BypassStage2:        domain.BypassStage2,
			DisableBypassStage3: domain.DisableBypassStage3,
			DisableRawStage3:    domain.DisableRawStage3,
			DisableBypassStage2: domain.DisableBypassStage2,
			DisableRawStage2:    domain.DisableRawStage2,
		})

		firewall.Mutex.Lock()
		domains.DomainsData[domain.Name] = domains.DomainData{
			Stage:            1,
			StageManuallySet: false,
			RawAttack:        false,
			BypassAttack:     false,
			LastLogs:         []string{},

			TotalRequests:    0,
			BypassedRequests: 0,

			PrevRequests: 0,
			PrevBypassed: 0,

			RequestsPerSecond:             0,
			RequestsBypassedPerSecond:     0,
			PeakRequestsPerSecond:         0,
			PeakRequestsBypassedPerSecond: 0,
			RequestLogger:                 []domains.RequestLog{},
		}
		firewall.Mutex.Unlock()
	}

	if len(domains.Domains) == 0 {
		AddDomain()
		Load()
	} else {
		proxy.WatchedDomain = domains.Domains[0]
		db.Connect()
	}
}
