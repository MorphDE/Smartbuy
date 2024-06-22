import { Orders } from "../models/orders.js"
import { Cart } from "../models/cart.js"

async function createOrderFromCart(userId) {
    const cart = await Cart.findOne({ userId: userId }).populate('items.itemId');

    const order = await Orders.create({
        userId,
        items: cart.items,
        total: cart.items.reduce((sum, item) => sum + (item.itemId.price * item.amount), 0)
    });

    if (order) {
        await Cart.findByIdAndDelete(cart._id);
    }

    return order;
}

export const OrderService = {
    createOrderFromCart
}