import { Link } from "react-router-dom";
import "./Onboarding.css";

const Onboarding = () => {
    return (
        <section className="onboarding">
            <img src="./public/Illustration.png" alt="Background Image" />
            <div className="onboarding-text">
                <h1>Schnell und einfach die beste Technik kaufen</h1>
                <p>Finde noch heute dein Wunschprodukt in unserem großen Sortiment und bestelle mit wenigen Klicks dein Produkt</p>
            </div>
            <div className="onboarding-btn">
                <Link to={"/login"}><button className="btn-big">Jetzt Starten</button></Link>
            </div>
        </section>
    );
}
 
export default Onboarding;