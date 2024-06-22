import { useEffect, useState } from "react";
import "./Categories.css";
import { Category } from "../../models/Item";
import { BACKEND_URL } from './../../utils/api';

interface Props {
    setCategory:(value:Category | null) => void;
}

const Categories = (props:Props) => {

    const [itemCategories, setItemCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    useEffect(() => {
        fetch(`${BACKEND_URL}/api/v1/categories`)
        .then(res => res.json())
        .then((categories) => setItemCategories(categories))
        .catch((error) => console.log("Fehler beim abrufen der Kategorien!", error));
    }, [])

    const handleCategoryClick = (category: Category) => {
        props.setCategory(selectedCategory?._id === category._id ? null : category);
        setSelectedCategory(selectedCategory?._id === category._id ? null : category);
    };

    return (
        <div className="outer-container">
            <div className="scroll-container">
                {itemCategories.map((item) => (
                    <div
                        className={`item ${selectedCategory?._id === item._id ? 'selected' : ''}`}
                        key={item._id}
                        onClick={() => handleCategoryClick(item)}
                    >
                        <img
                            src={`${BACKEND_URL}/api/v1/uploads/category-images/${item.icon}`}
                            alt={`${item.name} icon`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Categories;