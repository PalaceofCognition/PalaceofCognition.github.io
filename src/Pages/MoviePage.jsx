import MovieComponent from "../Components/Movie";
import HeaderLayout from "../Layouts/Header"

const MoviePage = () => {
    const Style = {
        marginTop: "95px"
    };

    return (
    <div>
        <main>
            <header>
                <HeaderLayout showMain={true} showBooks={true} showMovies={false} showArticles={true} />
            </header>
            <h1 style={Style}>კინო კლუბი</h1>

            {/* ფილმები */}
            <MovieComponent
                imageUrl="https://i.pinimg.com/564x/e3/14/91/e31491b86a6e8dbd1cadfcfae7d5cd79.jpg"
                title="ფილმი"
                description="მოკლე შინაარსი"
                author="ავტორი"
            />
            <MovieComponent
                imageUrl="https://i.pinimg.com/564x/e3/14/91/e31491b86a6e8dbd1cadfcfae7d5cd79.jpg"
                title="ფილმი"
                description="მოკლე შინაარსი"
                author="ავტორი"
            />
            <MovieComponent
                imageUrl="https://i.pinimg.com/564x/e3/14/91/e31491b86a6e8dbd1cadfcfae7d5cd79.jpg"
                title="ფილმი"
                description="მოკლე შინაარსი"
                author="ავტორი"
            />
            <MovieComponent
                imageUrl="https://i.pinimg.com/564x/e3/14/91/e31491b86a6e8dbd1cadfcfae7d5cd79.jpg"
                title="ფილმი"
                description="მოკლე შინაარსი"
                author="ავტორი"
            />
        </main>
    </div>
    )
}

export default MoviePage