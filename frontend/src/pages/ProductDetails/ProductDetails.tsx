import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import { useEffect, useState } from "react";
import { Item } from "../../models/Item";
import HeaderTwo from './../../components/HeaderTwo/HeaderTwo';
import { itemToCart } from "../../utils/addItemToCart";
import { BACKEND_URL } from "../../utils/api";

const ProductDetails = () => {

    const { id } = useParams();

    const [itemDetails, setItemDetails] = useState<Item>();

     useEffect(() => {
         fetch(`${BACKEND_URL}/api/v1/items/id/${id}`)
         .then(res => res.json())
         .then((item) => setItemDetails(item))
         .catch((error) => console.log("Fehler beim abrufen der Produkt Details!", error));
     }, [])

     if(!itemDetails) {
        return <p>Item nicht gefunden!</p>;
     }
    
    return (
        <section className="detail-page">
            <HeaderTwo title="Produkt Übersicht"/>
            <div className="product-details">
                <img src={`${BACKEND_URL}/api/v1/uploads/${itemDetails.image}`} alt="" />
                <p className="detail-name">{itemDetails.name}</p>
                <p className="detail-desc">{itemDetails.description}</p>
                <div className="detail-pricerate">
                    <p className="detail-price">{itemDetails.price}€</p>
                    <p className="detail-rate">{itemDetails.rating} Bewertung</p>
                </div>
                <button className="btn-big" onClick={() => itemToCart(itemDetails._id)}>In den Warenkorb</button>
            </div>
        </section>
    );
}
 
export default ProductDetails;