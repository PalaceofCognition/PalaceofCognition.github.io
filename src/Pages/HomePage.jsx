import HeaderLayout from "../Layouts/Header"
import LatestNewsComponent from "../Components/LatestNews"

const HomePage = () => {
    const Style = {
        marginTop: "95px"
    };

    return (
    <div>
        <main>
            <header>
                <HeaderLayout showMain={false} showBooks={true} showMovies={true} showArticles={true} />
            </header>

            <h1 style={Style}>მთავარი</h1>

            <LatestNewsComponent
            imageUrl="https://i.pinimg.com/564x/1f/71/5e/1f715ee4daed0b2f00af1dfad97b712c.jpg"
            title="უახლესი რეცენზია"
            description="ზედმეტად დიდი ტექსტი, ზედმეტად დიდი ტექსტი."
            />

            <LatestNewsComponent
            imageUrl="https://i.pinimg.com/564x/69/ca/df/69cadf4d87dcfda36966160f7e92ff8d.jpg"
            title="უახლესი ფილმი"
            description="ზედმეტად დიდი ტექსტი, ზედმეტად დიდი ტექსტი."
            />

            <LatestNewsComponent
            imageUrl="https://i.pinimg.com/564x/a5/d8/92/a5d892f2a1b8f1e2e4fe4293676e4872.jpg"
            title="უახლესი წიგნი"
            description="ზედმეტად დიდი ტექსტი, ზედმეტად დიდი ტექსტი."
            />
        </main>
    </div>
    )
}

export default HomePage