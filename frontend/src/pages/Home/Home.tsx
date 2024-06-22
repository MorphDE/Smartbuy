import { useState } from "react";
import Categories from "../../components/Categories/Categories";
import Footer from "../../components/Footer/Footer";
import ProductByCategory from "../../components/ProductByCategory/ProductByCategory";
import ProductCards from "../../components/ProductCards/ProductCards";
import Searchbar from "../../components/Searchbar/Searchbar";
import "./Home.css";
import { Category } from "../../models/Item";

const Home = () => {

    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    return (
        <section className="home-page">
            <h1 className="home-title">Finde dein Lieblingsprodukt</h1>
            <Searchbar/>
            <Categories setCategory={ setSelectedCategory }/>
            <h2 className="beliebt">{ selectedCategory === null ? "Beliebte Produkte" : selectedCategory.name }</h2>
            {
                selectedCategory === null 
                ? <ProductCards/>
                : <ProductByCategory categoryId={ selectedCategory._id }/>
            } 
            <Footer/>
        </section>
    );
}
 
export default Home;