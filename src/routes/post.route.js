import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPost,
  getPostById,
  updatePost,
} from "../controllers/post.controller.js";
export const routePost = Router();

routePost.post("/posts", createPost);
routePost.get("/posts", getAllPost);
routePost.get("/posts/:id", getPostById);
routePost.put("/posts/:id", updatePost);
routePost.delete("/posts/:id", deletePost);
