import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Profile from './pages/Profile/Profile'
import Onboarding from './pages/Onboarding/Onboarding'
import Cart from './pages/Cart/Cart'
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Order from "./pages/Order/Order";

const AppRoutes = () => {

    const { getToken } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                {getToken() ?
                    <>
                        <Route path='/' element={<Home />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/product/:id' element={<ProductDetails />} />
                        <Route path='/welcome' element={<Onboarding />} />
                        <Route path='/cart' element={<Cart />} />
                        <Route path='/order' element={<Order />} />
                        <Route path="*" element={<Navigate replace to="/welcome" />} />
                    </>
                    : <Route path="*" element={<Navigate replace to="/login" />} />
                }
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;