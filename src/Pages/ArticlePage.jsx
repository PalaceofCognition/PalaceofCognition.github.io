import React from 'react';
import HeaderLayout from "../Layouts/Header";
import ArticleList from '../Layouts/ArticleList';

import { Helmet } from 'react-helmet';

const ArticlePage = () => {
    const Style = {
        marginTop: "95px"
    };

    return (
        <div>
            <Helmet>
                <meta name="description" content={"View more articles"} />
                <meta property="og:title" content={"Articles"} />
                <meta property="og:description" content={"View more articles"} />
            </Helmet>
            <header>
                <HeaderLayout showMain={true} showBooks={true} showMovies={true} showArticles={false} />
            </header>
            <h1 style={Style}>რეცენზიები</h1>
            <ArticleList />
        </div>
    );
};

export default ArticlePage;
