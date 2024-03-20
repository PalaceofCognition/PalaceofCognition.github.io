import { Link, Outlet } from "react-router-dom";
import React from "react";

// const colors = ['#383431', '#523553', '#34405f', '#375239', '#6e5d39'];

const HeaderLayout = ({ showMain = true, showBooks = true, showMovies = true, showArticles = true }) => {
    // const randomColor = colors[Math.floor(Math.random() * colors.length)];

    // const Style = {
    //     backgroundColor: randomColor,
    // };

    return (
        <div className='layoutDiv'>
            {showMain && <Link className="layoutButton" to={'/'}>მთავარი</Link>}
            {showBooks && <Link className="layoutButton" to={'/books'}>წიგნები</Link>}
            {showMovies && <Link className="layoutButton" to={'/movies'}>ფილმები</Link>}
            {showArticles && <Link className="layoutButton" to={'/articles'}>რეცენზიები</Link>}

            <Outlet />
        </div>
    );
};

export default HeaderLayout;
