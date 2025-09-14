import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getUserById,
  updateUser,
} from "../controllers/user.controller.js";
export const userRoute = Router();

userRoute.post("/users", createUser);
userRoute.get("/users", getAllUser);
userRoute.put("/users/:id", updateUser);
userRoute.delete("/users/:id", deleteUser);
userRoute.get("/users/:id", getUserById);
