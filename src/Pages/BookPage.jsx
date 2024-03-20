import HeaderLayout from "../Layouts/Header"
import BookComponent from "../Components/Book"

const BookPage = () => {
    const Style = {
        marginTop: "95px"
    };

    return (
    <div>
        <main>
            <header>
                <HeaderLayout showMain={true} showBooks={false} showMovies={true} showArticles={true} />
            </header>
            <h1 style={Style}>წიგნის წრე</h1>

            {/* წიგნები */}
            <BookComponent
                imageUrl="https://i.pinimg.com/564x/14/b6/70/14b670f183eb1a0ea98d5379f36edd86.jpg"
                title="წიგნი"
                description="მოკლე შინაარსი"
                author="ავტორი"
            />
            <BookComponent
                imageUrl="https://i.pinimg.com/564x/14/b6/70/14b670f183eb1a0ea98d5379f36edd86.jpg"
                title="წიგნი"
                description="მოკლე შინაარსი"
                author="ავტორი"
            />
            <BookComponent
                imageUrl="https://i.pinimg.com/564x/14/b6/70/14b670f183eb1a0ea98d5379f36edd86.jpg"
                title="წიგნი"
                description="მოკლე შინაარსი"
                author="ავტორი"
            />
            <BookComponent
                imageUrl="https://i.pinimg.com/564x/14/b6/70/14b670f183eb1a0ea98d5379f36edd86.jpg"
                title="წიგნი"
                description="მოკლე შინაარსი"
                author="ავტორი"
            />
        </main>
    </div>
    )
}

export default BookPage