import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
        items:
            [
                {
                    itemId: { type: mongoose.Types.ObjectId, ref: "items", required: true },
                    amount: { type: Number, required: true },
                }
            ],
        total: { type: Number, required: true },
    },
    { collection: "orders", timestamps: true }
);

export const Orders = mongoose.model("orders", orderSchema);