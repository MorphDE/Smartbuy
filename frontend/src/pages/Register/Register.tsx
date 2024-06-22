import { useState } from "react";
import "./Register.css";
import { User, Address } from "../../models/User";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../utils/api";
import { Bounce, ToastContainer, toast } from "react-toastify";

const Register = () => {

    const initialFormData: User = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        address: {
            street: "",
            houseNumber: "",
            zipCode: "",
            city: "",
        },
        isAdmin: false
    }

    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialFormData);

    const handleRegister = async (event: any) => {
        event.preventDefault();
        try {
            const response = await fetch(`${BACKEND_URL}/api/v1/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                await response.json();
                setFormData(initialFormData);
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
                toast.success('Du hast dich erfolgreich registriert!', {
                    position: "top-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            } else {
                toast.error('Bitte überprüfe deine Angaben!', {
                    position: "top-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleInputAddress = (event: any) => {
        const { name, value } = event.target;
        let address: Address = { ...formData.address, [name]: value }
        setFormData({ ...formData, address });
    };

    return (
        <section className="register-wrap">
            <ToastContainer />
            <div className="register-box">
                <h1 className="register-title">Kostenlose Registrierung</h1>
                <form className="registerform" onSubmit={handleRegister}>
                    <input type="text" name="firstname" id="firstname" placeholder="Vorname" value={formData.firstname} onChange={handleInputChange} />
                    <input type="text" name="lastname" id="lastname" placeholder="Nachname" value={formData.lastname} onChange={handleInputChange} />
                    <input type="email" name="email" id="email" placeholder="E-Mail" value={formData.email} onChange={handleInputChange} />
                    <input type="password" name="password" id="password" placeholder="Passwort" value={formData.password} onChange={handleInputChange} />
                    <input type="text" name="street" id="street" placeholder="Straße" value={formData.address.street} onChange={handleInputAddress} />
                    <input type="text" name="houseNumber" id="housenumber" placeholder="Hausnummer" value={formData.address.houseNumber} onChange={handleInputAddress} />
                    <input type="text" name="zipCode" id="zipcode" placeholder="Postleitzahl" value={formData.address.zipCode} onChange={handleInputAddress} />
                    <input type="text" name="city" id="city" placeholder="Stadt" value={formData.address.city} onChange={handleInputAddress} />
                    <button type="submit" className="btn-big">Konto erstellen</button>
                </form>
                <Link to={"/login"}><p className="small-text">Ich habe bereits ein Konto</p></Link>
                {/* <div className={showNotification ? "notify2-open" : "notify2-close"}>
                    <Notify>
                        <p>Du hast dich erfolgreich registriert.</p>
                        <p>Du kannst dich jetzt einloggen.</p>
                    </Notify>
                </div> */}
            </div>
        </section>
    );
};

export default Register;