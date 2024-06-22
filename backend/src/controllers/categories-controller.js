import { CategoriesService } from "../services/categories-service.js";

async function getAllCategoriesCtrl(req, res) {
    try {
        const result = await CategoriesService.getAllCategories();
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err, message: err.message || "Could not get categories" });
    }
};

async function getCategoryByIdCtrl(req, res) {
    try {
        const result = await CategoriesService.getCategoryById(req.params.categoryId);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err, message: err.message || "Could not get category with id " + req.params.categoryId });
    }
}

async function createCategoryCtrl(req, res) {
    try {
        const result = await CategoriesService.createCategory(req.body);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err, message: err.message || "Could not create category" });
    }
}

async function deleteCategoryByIdCtrl(req, res) {
    try {
        const result = await CategoriesService.deleteCategory(req.params.categoryId);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err, message: err.message || "Could not delete category with id " + req.params.categoryId });
    }
}
export const CategoriesController = {
    getAllCategoriesCtrl,
    getCategoryByIdCtrl,
    createCategoryCtrl,
    deleteCategoryByIdCtrl
}