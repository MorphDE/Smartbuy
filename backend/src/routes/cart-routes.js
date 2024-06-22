

import express from "express";
import { doJwtAuth } from '../middlewares/doJwtAuth.js'
import { CartController } from "../controllers/cart-controller.js";

export const CartRoutes = express
    .Router()
    .get("/", doJwtAuth, CartController.getCartCtrl)
    .post("/", doJwtAuth, CartController.addItemToCartCtrl)
    .get("/order", doJwtAuth, CartController.createOrderFromCartCtrl)