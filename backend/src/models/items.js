import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        categoryId: { type: mongoose.Types.ObjectId, ref: "categories", required: true },
        price: { type: Number, required: true },
        rating: { type: Number, required: true },
    },
    { collection: "items", timestamps: true }
);

export const Items = mongoose.model("items", itemSchema);