import { Router } from "express";
import {
  addTagToPost,
  createPost,
  deletePost,
  getAllPost,
  getPostById,
  updatePost,
} from "../controllers/post.controller.js";
export const routePost = Router();
import { validator } from "../middlewares/validator.js";
import {
  createPostValidations,
  deletePostValidations,
  getPostsValidations,
  updatePostValidations,
} from "../middlewares/validations/post.validations.js";
routePost.post("/posts", createPostValidations, validator, createPost);
routePost.get("/posts", getAllPost);
routePost.get("/posts/:id", getPostsValidations, validator, getPostById);
routePost.put("/posts/:id", updatePostValidations, validator, updatePost);
routePost.delete("/posts/:id", deletePostValidations, validator, deletePost);
// por qué el patch? Porque la intencion no es reemplazar como tal el recurso
// como lo hace el put, además como no estamos tocando title, ni la description, ni el author del Post
// ni siquiera tocando el tags, simplemente añadiendo un nuevo id al array
routePost.patch("/posts/:post_id/tags/:tag_id", addTagToPost);
