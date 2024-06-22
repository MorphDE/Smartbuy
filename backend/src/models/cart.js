import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
        items:
            [
                {
                    itemId: { type: mongoose.Types.ObjectId, ref: "items", required: true },
                    amount: { type: Number, required: true },
                }
            ]
    },
    { collection: "cart", timestamps: true }
);

export const Cart = mongoose.model("cart", cartSchema);