import React from 'react';
import { useParams } from 'react-router-dom';
import articles from '../Articles.json';

const SingleArticlePage = () => {
  const { title } = useParams();
  const article = articles.find((article) => article.title === title);

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div>
        <div>
            {/* <title>{article.title}</title>
            <meta name="description" content={article.description} />
            <meta property="og:title" content={article.title} />
            <meta property="og:description" content={article.description} />
            <meta property="og:image" content={article.imageUrl} /> */}
            </div>
            <div>
            <h1>{article.title}</h1>
            <p>Author: {article.author}</p>
            <p>{article.fullText}</p>
        </div>
    </div>
  );
};

export default SingleArticlePage;
