import React from 'react';

const LatestNewsComponent = ({imageUrl, title, description}) => {
    return (
        <div className="latestNews">
        <img src={imageUrl} className="latestNews-image" alt="" />
        <h1 className="latestNews-title">{title}</h1>
        <label className="latestNews-description">{description}</label>
        </div>
    )
}

export default LatestNewsComponent