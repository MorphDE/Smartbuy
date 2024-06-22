import express from "express";
import { UsersController } from '../controllers/users-controller.js';
import { doJwtAuth } from '../middlewares/doJwtAuth.js'
import { requireAdmin } from '../middlewares/requireAdmin.js'

export const UsersRouter = express
  .Router()
  .post("/register", UsersController.registerUserCtrl)
  .post("/login", UsersController.loginUserCtrl)
  .get("/me", doJwtAuth, UsersController.getLoggedInUserDetailsCtrl)
  .get("/", requireAdmin, UsersController.getAllUsersCtrl)
  .get("/:userId", requireAdmin, UsersController.getUserDetailsCtrl)
  .delete("/:userId", requireAdmin, UsersController.deleteUserByIdCtrl)
  .patch("/:userId", requireAdmin, UsersController.updateUserByIdCtrl)