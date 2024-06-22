import { Categories } from './../models/categories.js';

const getAllCategories = async () => {
    const allCategories = await Categories.find({});
    return allCategories;
}

const createCategory = async (categoryData) => {
    const categoryFound = await Categories.findOne({ name: categoryData.name })
    if (categoryFound) {
        throw new Error("Category with this name already exists!");
    } else {
        const newCategory = await Categories.create(categoryData);
        return newCategory;
    }
}

const deleteCategory = async (categoryId) => {
    const delCategory = await Categories.findByIdAndDelete(categoryId)
    if (!delCategory) throw new Error("Category with this id doesn't exist!");
    else return delCategory;
};

const getCategoryById = async (categoryId) => {
    const categoryFound = await Categories.findById(categoryId);
    if (categoryFound) {
        return categoryFound;
    } else {
        throw new Error("Category with this id was not found!");
    }
}

export const CategoriesService = {
    getAllCategories,
    getCategoryById,
    createCategory,
    deleteCategory,
};
