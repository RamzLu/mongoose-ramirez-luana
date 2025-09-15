import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getUserById,
  updateUser,
} from "../controllers/user.controller.js";
import { validator } from "../middlewares/validator.js";
import {
  createUserValidations,
  deleteUserValidations,
  getUserValidations,
  updateUserValidations,
} from "../middlewares/validations/user.validations.js";
export const userRoute = Router();

userRoute.post("/users", createUserValidations, validator, createUser);
userRoute.get("/users", getAllUser);
userRoute.put("/users/:id", updateUserValidations, validator, updateUser);
userRoute.delete("/users/:id", deleteUserValidations, validator, deleteUser);
userRoute.get("/users/:id", getUserValidations, validator, getUserById);
