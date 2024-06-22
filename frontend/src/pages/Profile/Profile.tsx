import { useEffect, useState } from "react";
import "./Profile.css";
import { fetchWithToken } from "../../utils/FetchWithToken";
import { User } from "../../models/User";
import Footer from "../../components/Footer/Footer";
import HeaderTwo from "../../components/HeaderTwo/HeaderTwo";
import { BACKEND_URL } from "../../utils/api";

const Profile = () => {


    const [user, setUser] = useState<User | null>();

    useEffect(() => {
        fetchWithToken(`${BACKEND_URL}/api/v1/users/me`)
            .then(res => res.json())
            .then((user: User) => {
                setUser(user);
            })
            .catch((error: any) => {
                console.log("Could not get user details!", error);
            })
    }, [])

    if (!user) return "Loading....";

    return (
        <section className="user-profile">
            <HeaderTwo title="Mein Profil"/>
            <section className="profile-containers">
               <div className="profile-info">
                    <p className="user-info">{user.firstname}</p>
                    <i className="fa-solid fa-pen-to-square"></i>
                </div>
                <div className="profile-info">
                    <p className="user-info">{user.lastname}</p>
                    <i className="fa-solid fa-pen-to-square"></i>
                </div>
                <div className="profile-info">
                    <p className="user-info">{user.address.street} {user.address.houseNumber}</p>
                    <i className="fa-solid fa-pen-to-square"></i>
                </div>
                <div className="profile-info">
                    <p className="user-info">{user.address.zipCode}</p>
                    <i className="fa-solid fa-pen-to-square"></i>
                </div>
                <div className="profile-info">
                    <p className="user-info">{user.address.city}</p>
                    <i className="fa-solid fa-pen-to-square"></i>
                </div>
                <div className="profile-info">
                    <p className="user-info">{user.email}</p>
                    <i className="fa-solid fa-pen-to-square"></i>
                </div>
                <p className="profile-hint">Es hat sich etwas bei deinen persönlichen Daten geändert? Kein Problem! Du kannst ganz einfach deine Daten innerhalb deine Profils anpassen.</p>
            </section>
            <Footer/>
        </section>
    );
}

export default Profile;