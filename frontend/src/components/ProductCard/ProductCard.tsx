import { Link } from "react-router-dom";
import "./ProductCard.css";
import { Item } from "../../models/Item";
import { itemToCart } from "../../utils/addItemToCart";
import { BACKEND_URL } from "../../utils/api";

export interface Props {
    item: Item;
}

const ProductCard = (props:Props) => {

    return (
        <div className="product">
            <div className="product-img">
                <Link to={`/product/${props.item._id}`}><img src={`${BACKEND_URL}/api/v1/uploads/${props.item.image}`} alt="Product Image" /></Link>
            </div>
            <div className="rating">
                <i className="fa-solid fa-star rating-star"></i>
                <p className="item-rating">{props.item.rating}</p>
            </div>
            <h1 className="product-name">{props.item.name}</h1>
            <div className="price">
                <p className="item-price">{props.item.price}€</p>
                <i className="fa-solid fa-circle-plus" onClick={() => itemToCart(props.item._id)}></i>
            </div>
        </div>
    );
}
 
export default ProductCard;