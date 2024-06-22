import { CartService } from "../services/cart-service.js"
import { OrderService } from "../services/order-service.js";

async function addItemToCartCtrl(req, res) {
    try {
        const cart = await CartService.addItemToCart(req.authenticatedUserId, req.body.itemId, req.body.amount);
        res.json(cart);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err, message: err.message || "Could not add item to cart" });
    }
}

async function getCartCtrl(req, res) {
    try {
        const cart = await CartService.getCartByUserId(req.authenticatedUserId);
        res.json(cart);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err, message: err.message || "Could not get cart" });
    }
}

async function createOrderFromCartCtrl(req, res) {
    try {
        const order = await OrderService.createOrderFromCart(req.authenticatedUserId);
        res.json(order);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err, message: err.message || "Could not create order from cart" });
    }
}

export const CartController = {
    addItemToCartCtrl,
    getCartCtrl,
    createOrderFromCartCtrl
} 