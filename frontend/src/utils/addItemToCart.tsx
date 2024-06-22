import { Bounce, toast } from "react-toastify";
import { CartAddItem } from "../models/Cart";
import { fetchWithToken } from "./FetchWithToken";
import { BACKEND_URL } from "./api";

export const itemToCart = async (itemid:string, amount:number = 1) => {
    const addItem: CartAddItem = {
        itemId: itemid,
        amount: amount
    }
    try {
        await fetchWithToken(`${BACKEND_URL}/api/v1/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addItem),
        });
        toast.info(`Du hast einen Artikel in den Warenkorb gelegt.`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
 }