import { Router } from "express";
import {
  createTag,
  deleteTag,
  getAllTags,
  getTagById,
  updateTag,
} from "../controllers/tag.controller.js";

export const routerTag = Router();

routerTag.post("/tags", createTag);
routerTag.get("/tags", getAllTags);
routerTag.get("/tags/:id", getTagById);
routerTag.put("/tags/:id", updateTag);
routerTag.delete("/tags/:id", deleteTag);
