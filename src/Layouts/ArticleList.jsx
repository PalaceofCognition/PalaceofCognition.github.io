import React from 'react';
import { Link } from 'react-router-dom';
import articles from '../Articles.json';

const colors = ['#6b7a6f', '#775a5a', '#634875', '#647d94'];

const ArticleList = () => {
  return (
    <div>
      {articles.map((article) => (
        <div key={article.id} className="webComponent" style={{ backgroundColor: colors[article.id % colors.length] }}>
          <div className="webComponent-inside-container">
            <img src={article.imageUrl} alt={article.title} className="webComponent-image" />
            <h2 className="webComponent-title">{article.title}</h2>
            <label className='webComponent-author'>{article.author}</label>
            <p className="webComponent-description">{article.description}</p>
            <div className="btnMargin">
              <Link
                to={{
                  pathname: `/article/${article.title}`, // Pass the article ID
                  state: { articleId: article.title } // Pass the article ID in the state
                }}
                className="webComponent-button"
              >
                View More
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
