import { Router } from "express";
import {
  createTag,
  deleteTag,
  getAllTags,
  getTagById,
  updateTag,
} from "../controllers/tag.controller.js";
import { validator } from "../middlewares/validator.js";
import {
  createTagValidations,
  deleteTagValidations,
  getTagValidations,
  updateTagValidations,
} from "../middlewares/validations/tag.validations.js";
export const routerTag = Router();

routerTag.post("/tags", createTagValidations, validator, createTag);
routerTag.get("/tags", getAllTags);
routerTag.get("/tags/:id", getTagValidations, validator, getTagById);
routerTag.put("/tags/:id", updateTagValidations, validator, updateTag);
routerTag.delete("/tags/:id", deleteTagValidations, validator, deleteTag);
