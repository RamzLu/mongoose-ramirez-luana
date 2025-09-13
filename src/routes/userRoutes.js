import { Router } from "express";
import { createUser } from "../controllers/user.controller.js";
export const userRoute = Router();

userRoute.post("/user", createUser);
