import express from "express";
import { doJwtAuth } from '../middlewares/doJwtAuth.js'
import { requireAdmin } from '../middlewares/requireAdmin.js'
import { CategoriesController } from "../controllers/categories-controller.js";

export const CategoriesRoutes = express
    .Router()
    .get("/", CategoriesController.getAllCategoriesCtrl)
    .get("/:categoryId", doJwtAuth, CategoriesController.getCategoryByIdCtrl)
    .post("/", requireAdmin, CategoriesController.createCategoryCtrl)
    .delete("/:categoryId", requireAdmin, CategoriesController.deleteCategoryByIdCtrl)