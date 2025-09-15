import { body, param } from "express-validator";
import { TagModel } from "../../models/tag.model.js";

export const createTagValidations = [
  body("tag_name")
    .notEmpty()
    .withMessage("El nombre de la etiqueta es obligatorio.")
    .isString()
    .withMessage("El nombre de la etiqueta debe ser una cadena de texto.")
    .custom(async (value) => {
      const existingTag = await TagModel.findOne({ tag_name: value });
      if (existingTag) {
        throw new Error("Esta etiqueta ya existe.");
      }
      return true;
    }),
];

export const updateTagValidations = [
  param("id")
    .notEmpty()
    .withMessage("El id de la etiqueta es obligatorio.")
    .isMongoId()
    .withMessage("El id de la etiqueta no es válido.")
    .custom(async (value) => {
      const tag = await TagModel.findById(value);
      if (!tag) {
        throw new Error("La etiqueta no existe.");
      }
      return true;
    }),

  body("tag_name")
    .optional()
    .notEmpty()
    .withMessage("El nombre de la etiqueta no puede estar vacío.")
    .isString()
    .withMessage("El nombre de la etiqueta debe ser una cadena de texto.")
    .custom(async (value, { req }) => {
      const existingTag = await TagModel.findOne({ tag_name: value });
      if (existingTag && existingTag._id.toString() !== req.params.id) {
        throw new Error("Esta etiqueta ya existe.");
      }
      return true;
    }),
];

export const getTagValidations = [
  param("id")
    .notEmpty()
    .withMessage("El id de la etiqueta es obligatorio.")
    .isMongoId()
    .withMessage("El id de la etiqueta no es válido.")
    .custom(async (value) => {
      const tag = await TagModel.findById(value);
      if (!tag) {
        throw new Error("La etiqueta no existe.");
      }
      return true;
    }),
];

export const deleteTagValidations = [
  param("id")
    .notEmpty()
    .withMessage("El id de la etiqueta es obligatorio.")
    .isMongoId()
    .withMessage("El id de la etiqueta no es válido.")
    .custom(async (value) => {
      const tag = await TagModel.findById(value);
      if (!tag) {
        throw new Error("La etiqueta no existe.");
      }
      return true;
    }),
];
