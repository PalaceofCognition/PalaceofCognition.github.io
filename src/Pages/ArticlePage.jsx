import React from 'react';
import HeaderLayout from "../Layouts/Header";
import ArticleList from '../Layouts/ArticleList';

const ArticlePage = () => {
    const Style = {
        marginTop: "95px"
    };

    return (
        <div>
            <header>
                <HeaderLayout showMain={true} showBooks={true} showMovies={true} showArticles={false} />
            </header>
            <h1 style={Style}>რეცენზიები</h1>
            <ArticleList />
        </div>
    );
};

export default ArticlePage;
