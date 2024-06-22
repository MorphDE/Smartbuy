import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        icon: { type: String, required: true },
    },
    { collection: "categories", timestamps: true }
);

export const Categories = mongoose.model("categories", categoriesSchema);