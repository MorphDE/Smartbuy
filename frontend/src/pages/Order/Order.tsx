import HeaderTwo from "../../components/HeaderTwo/HeaderTwo";
import "./Order.css";

const Order = () => {
    return (
        <section className="order">
            <HeaderTwo title="Bestellung erfolgreich"/>
            <div className="order-content">
                <div className="ordercomplete">
                    <h1>SmartBuy</h1>
                    <p>Danke für deine Bestellung!</p>
                </div>
                <div className="pyro">
                    <div className="before"></div>
                    <div className="after"></div>
                </div>
            </div>
        </section>
    );
}
 
export default Order;