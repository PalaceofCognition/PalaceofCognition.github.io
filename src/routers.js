import HomePage from "./Pages/HomePage"
import ArticlePage from "./Pages/ArticlePage"
import AboutPage from "./Pages/AboutPage"
import BookPage from "./Pages/BookPage"
import MoviePage from "./Pages/MoviePage"
import SingleArticlePage from "./Pages/SingleArticlePage"

const router = [
    {
        element: <HomePage/>,
        path: '/',
        exact: true
    },
    {
        element: <AboutPage/>,
        path: '/about'
    },
    {
        element: <ArticlePage/>,
        path: '/articles',
        routes: [ // Nested routes for articles
            {
                element: <SingleArticlePage />, // Render SingleArticlePage for specific articles
                path: '/articles/:title' // Dynamic path for specific article titles
            },
            {
                element: <SingleArticlePage />,
                path: '/article/:id' // Dynamic path for specific article IDs
              }
        ]
    },
    {
        element: <MoviePage/>,
        path: '/movies'
    },
    {
        element: <BookPage/>,
        path: '/books'
    }
]

export default router
