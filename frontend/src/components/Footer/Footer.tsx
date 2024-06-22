import { NavLink } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    return (
        <section className="footer">
            <NavLink to={"/"}><i className="fa-solid fa-house"></i></NavLink>
            <NavLink to={"/profile"}><i className="fa-solid fa-user"></i></NavLink>
            <NavLink to={"/cart"}><i className="fa-solid fa-cart-shopping"></i></NavLink>
        </section>
    );
}
 
export default Footer;