import { useContext, useState } from "react";
import { AuthContext } from '../../context/AuthContext.tsx'
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../utils/api.ts";
import { Bounce, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface LoginData {
    email: string;
    password: string;
}

const Login = () => {

    const [formData, setFormData] = useState<LoginData>({ email: "", password: "" });

    const { setToken } = useContext(AuthContext);

    const navigate = useNavigate();

    const logIn = (event: any) => {
        event.preventDefault()
        fetch(`${BACKEND_URL}/api/v1/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then((userRes: any) => {
                if (userRes.err) {
                    console.log("Wrong username / password");
                    toast.error('Bitte überprüfe deine Anmeldedaten!', {
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
                else {
                    setToken(userRes.tokens.accessToken);
                    setTimeout(() => {
                        navigate("/");
                    }, 3000);
                    console.log("Erfolgreich eingeloggt!");
                    toast.success('Du hast dich erfolgreich eingeloggt!', {
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
                }
            })
            .catch((error: any) => {
                console.log("Could not login user!", error);
            })
    }

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <section className="login">
            <img src="./Illustration.png" alt="Background Image" />
            <div className="login-content">
                <h1>Hast du bereits ein Konto?</h1>
                <form onSubmit={logIn} className="login-form-wrap">
                    <div className="login-form">
                        <input type="email" name="email" id="email" placeholder="E-Mail Adresse" value={formData.email} onChange={handleInputChange} />
                        <input type="password" name="password" id="password" placeholder="Passwort" value={formData.password} onChange={handleInputChange} />
                    </div>
                    <button className="btn-big" type="submit">Anmelden</button>
                </form>
                <Link to={"/register"}><p className="small-text">Ich habe noch kein Konto</p></Link>
            </div>
        </section>
    );
}

export default Login;