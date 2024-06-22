import { Cart } from "../models/cart.js";
import mongoose from "mongoose";

const getCartByUserId = async (userId) => {
    const cartWithItems = await Cart.aggregate([
        { $match: { userId: mongoose.Types.ObjectId.createFromHexString(userId) } },  // Match the cart by userId
        {
            $unwind: "$items"  // Unwind the items array to handle each item individually
        },
        {
            $lookup: {
                from: "items",  // The collection to join with
                localField: "items.itemId",  // Field from the cart collection
                foreignField: "_id",  // Field from the items collection
                as: "itemDetails"  // Alias for the joined documents
            }
        },
        {
            $unwind: "$itemDetails"  // Unwind the itemDetails array
        },
        {
            $project: {
                _id: 1,  // Include the cart ID
                userId: 1,  // Include the user ID
                "items.amount": 1,  // Include the item amount
                "itemDetails._id": 1,  // Include the item ID
                "itemDetails.name": 1,  // Include the item name
                "itemDetails.price": 1,  // Include the item price
                "itemDetails.image": 1
            }
        },
        {
            $group: {
                _id: "$_id",  // Group by cart ID
                userId: { $first: "$userId" },  // Include the user ID
                items: {
                    $push: {
                        itemId: "$itemDetails._id",  // Collect the item ID
                        name: "$itemDetails.name",  // Collect the item name
                        price: "$itemDetails.price",  // Collect the item price
                        amount: "$items.amount",  // Collect the item amount
                        image: "$itemDetails.image"
                    }
                }
            }
        }
    ]);

    //const cart = await Cart.findOne({ userId: userId }).populate('items.itemId')

    return cartWithItems ? cartWithItems[0] : { userId, items: [] };
}
async function addItemToCart(userId, itemId, itemAmount) {

    const newItem = {
        itemId,
        amount: itemAmount
    }

    let cart = await Cart.findOne({ userId: userId })
    if (cart) {
        let cartItems = cart.items;
        let cartItemExists = cartItems.find(x => x.itemId == itemId);
        if (cartItemExists) {
            cartItemExists.amount += itemAmount;
        }
        else {
            if (itemAmount <= 0) return cart;
            cartItems.push(newItem);
        }
        //Remove item if 0 amount
        if (cartItemExists && cartItemExists.amount <= 0) {
            cart = await Cart.findByIdAndUpdate(cart._id, {
                $pull: {
                    items: { itemId: itemId }
                }
            }, { new: true });
        }
        else {
            cart = await Cart.findByIdAndUpdate(cart._id, {
                $set: {
                    items: cartItems
                }
            }, { new: true });
        }
    }
    else {
        if (itemAmount <= 0) return null;

        cart = await Cart.create({
            userId,
            items: [newItem]
        })
    }
    return cart;
}

export const CartService = {
    getCartByUserId,
    addItemToCart
};