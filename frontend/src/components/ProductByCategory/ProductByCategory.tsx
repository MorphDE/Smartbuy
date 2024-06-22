import { useEffect, useState } from "react";
import "./ProductByCategory.css";
import ProductCard from "../ProductCard/ProductCard";
import { Item } from "../../models/Item";
import { BACKEND_URL } from "../../utils/api";

interface Props {
    categoryId:string;
}

const ProductByCategory = (props:Props) => {
    const [itemRatingDesc, setItemRatingDesc] = useState<Item[]>([]);

     useEffect(() => {
         fetch(`${BACKEND_URL}/api/v1/items/category/${props.categoryId}`)
         .then(res => res.json())
         .then((items) => setItemRatingDesc(items))
         .catch((error) => console.log("Fehler beim abrufen der beliebtesten Produkte!", error));
     }, [props.categoryId])

    return (
        <section className="products">
            {itemRatingDesc.map((item, key) => (
                <ProductCard item={item} key={key}/>
            ))}
        </section>
    );
}
 
export default ProductByCategory;