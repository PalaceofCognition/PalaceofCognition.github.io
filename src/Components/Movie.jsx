import React from 'react';

const colors = ['#6b7a6f', '#775a5a', '#634875', '#647d94'];

const MovieComponent = ({ imageUrl, title, description, author}) => {

  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const Style = {
    backgroundColor: randomColor,
  };

  return (
    <div className="webComponent" style={Style}>
      <div className='webComponent-inside-container'>
        <img src={imageUrl} alt={title} className="webComponent-image" />
        <h2 className="webComponent-title">{title}</h2>
        <label className='webComponent-author'>{author}</label>
        <p className="webComponent-description">{description}</p>
      </div>
    </div>
  );
};

export default MovieComponent;