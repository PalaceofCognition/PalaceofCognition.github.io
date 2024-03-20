import React from 'react';
import { Link } from 'react-router-dom';

const colors = ['#6b7a6f', '#775a5a', '#634875', '#647d94'];

const ArticleComponent = ({ imageUrl, title, description, characters }) => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const Style = {
    backgroundColor: randomColor,
  };

  return (
    <div className="webComponent" style={Style}>
      <div className='webComponent-inside-container'>
        <img src={imageUrl} alt={title} className="webComponent-image" />
        <h2 className="webComponent-title">{title}</h2>
        <p className="webComponent-description">{description}</p>
        <div className='btnMargin'>
        <Link to={`/article/${encodeURIComponent(title)}`} className="webComponent-button">View More</Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleComponent;
