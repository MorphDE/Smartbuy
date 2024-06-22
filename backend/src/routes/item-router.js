import express from "express";
import { doJwtAuth } from '../middlewares/doJwtAuth.js'
import { requireAdmin } from '../middlewares/requireAdmin.js'
import { ItemsController } from "../controllers/items-controller.js";
import { upload } from "../utils/upload.js"

export const ItemRouter = express
    .Router()
    .get("/", ItemsController.getAllItemsCtrl)
    .get("/category/:categoryId", ItemsController.getItemsByCategoryIdCtrl)
    .get("/id/:itemId", ItemsController.getItemByIdCtrl)
    .get("/rating", ItemsController.getItemsByRatingDescCtrl)
    .get("/search/:searchText", ItemsController.getItemsBySearchTextCtrl)
    .post("/", requireAdmin, upload.single("image"), ItemsController.createItemCtrl)
    .patch("/:itemId", requireAdmin, ItemsController.updateItemByIdCtrl)
    .delete("/:itemId", requireAdmin, ItemsController.deleteItemByIdCtrl)