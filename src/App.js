import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoaderLayout from './Layouts/Loader';
import './App.css';

const AboutPage = lazy(() => import('./Pages/AboutPage'));
const ArticlePage = lazy(() => import('./Pages/ArticlePage'));
const HomePage = lazy(() => import('./Pages/HomePage'));
const MoviePage = lazy(() => import('./Pages/MoviePage'));
const BookPage = lazy(() => import('./Pages/BookPage'));
const SingleArticlePage = lazy(() => import('./Pages/SingleArticlePage'));

const App = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Suspense fallback={LoaderLayout}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/articles" element={<ArticlePage />} />
        <Route path="/books" element={<BookPage />} />
        <Route path="/movies" element={<MoviePage />} />
        <Route path="/article/:title" element={<SingleArticlePage />} />
        <Route path="/articles/:id" component={SingleArticlePage} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;
