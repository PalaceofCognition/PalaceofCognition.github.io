import HeaderLayout from "../Layouts/Header"

const AboutPage = () => {
    return (
    <div>
        <main>
            <header>
                <HeaderLayout showMain={true} showBooks={true} showMovies={true} showArticles={true} />
            </header>
            <h1>ჩვენს შესახებ</h1>
        </main>
    </div>
    )
}

export default AboutPage