import "./Cart.css";
import HeaderTwo from "../../components/HeaderTwo/HeaderTwo";
import { fetchWithToken } from "../../utils/FetchWithToken";
import { useEffect, useState } from "react";
import { UserCart } from "../../models/Cart";
import { itemToCart } from "../../utils/addItemToCart";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../utils/api";

const Cart = () => {

    const [showCart, setShowCard] = useState<UserCart>();

    useEffect(() => {
        getCart()
    }, [])

    const getCart = () => {
        fetchWithToken(`${BACKEND_URL}/api/v1/cart`)
            .then(res => res.json())
            .then((cart) => setShowCard(cart))
            .catch((err) => console.log(err))
    }

    const getCartValue = () => {
        return showCart?.items.reduce((sum, item) => sum + (item.amount * item.price), 0) ?? 0
    }

    const addItem = async (itemId: string, amount: number) => {
        await itemToCart(itemId, amount)
        getCart();
    }

    const navigate = useNavigate();

    const orderComplete = () => {
        fetchWithToken(`${BACKEND_URL}/api/v1/cart/order`)
            .then(res => res.json())
            .then(() => navigate("/order"))
            .catch((err) => console.log(err))
    }

    return (
        <section className="cart">
            <HeaderTwo title="Mein Warenkorb" />
            <div className="cart-items">
                {showCart?.items.map((item, key) => (
                    <div className="cart-single-item" key={key}>
                        <div className="item-name col-1">
                            <p className="cart-item-name">{item.name}</p>
                        </div>
                        <div className="cart-center col-2">
                            <i className="fa-solid fa-square-minus" onClick={() => addItem(item.itemId, -1)}></i>
                            <p className="cart-item-amount">{item.amount}</p>
                            <i className="fa-solid fa-square-plus" onClick={() => addItem(item.itemId, 1)}></i>
                        </div>
                        <div className="cart-item-price-container col-3">
                            <p className="cart-item-price">{(item.price * item.amount).toFixed(2)}€  </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="cart-endprice">
                <h3>Gesamtpreis:</h3>
                <p>{getCartValue()?.toFixed(2)}</p>
            </div>

            <div className="cart-content">
                <p className="agb">Mit einem Klick auf “Bestellung abschließen” stimmen Sie den Geschäftsbedingungen und dem Widerrufsrecht zu. Ihre Bestellung wird kostenpflichtig aufgegeben.</p>
                <button className={showCart == null || showCart.items.length === 0 ? "btn-big-disabled" : "btn-big"} onClick={orderComplete} disabled={showCart == null || showCart.items.length === 0}>Bestellung abschließen</button>
            </div>

        </section>
    );
}

export default Cart;