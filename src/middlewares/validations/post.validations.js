import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";
import { TagModel } from "../../models/tag.model.js";

export const createPostValidations = [
  body("title")
    .notEmpty()
    .withMessage("El título de la publicación es obligatorio.")
    .isString()
    .withMessage("El título debe ser una cadena de texto."),

  body("description")
    .notEmpty()
    .withMessage("La descripción de la publicación es obligatoria.")
    .isString()
    .withMessage("La descripción debe ser una cadena de texto."),

  body("author")
    .notEmpty()
    .withMessage("El id del autor es obligatorio.")
    .isMongoId()
    .withMessage("El id del autor no es válido.")
    .custom(async (value) => {
      const user = await UserModel.findById(value);
      if (!user) {
        throw new Error("El autor de la publicación no existe");
      }
      return true;
    }),

  body("tags")
    .optional()
    .isArray()
    .withMessage("Las etiquetas deben ser un array.")
    .custom(async (value) => {
      if (value.length === 0) {
        return true;
      }
      // verifica que cada id en el array sea un ObjectId válido
      const invalidIds = value.filter((id) => !id.match(/^[0-9a-fA-F]{24}$/));
      if (invalidIds.length > 0) {
        throw new Error("Uno o más ids de las etiquetas no son válidos");
      }

      // Verifica que todas las etiquetas existan en la base de datoss
      const existingTags = await TagModel.find({ _id: { $in: value } });
      if (existingTags.length !== value.length) {
        throw new Error("Una o más etiquetas no existen en la BD.");
      }
      return true;
    }),
];

export const updatePostValidations = [
  param("id")
    .notEmpty()
    .withMessage("El id de la publicación es obligatorio.")
    .isMongoId()
    .withMessage("El id de la publicación no es válido.")
    .custom(async (value) => {
      const post = await PostModel.findById(value);
      if (!post) {
        throw new Error("La publicación no existe.");
      }
      return true;
    }),

  body("title")
    .optional()
    .notEmpty()
    .withMessage("El título no puede estar vacío.")
    .isString()
    .withMessage("El título debe ser una cadena de texto."),

  body("description")
    .optional()
    .notEmpty()
    .withMessage("La descripción no puede estar vacía.")
    .isString()
    .withMessage("La descripción debe ser una cadena de texto."),

  body("author")
    .optional()
    .isMongoId()
    .withMessage("El id del autor no es válido.")
    .custom(async (value) => {
      const user = await UserModel.findById(value);
      if (!user) {
        throw new Error("El nuevo autor de la publicación no existe.");
      }
      return true;
    }),

  body("tags")
    .optional()
    .isArray()
    .withMessage("Las etiquetas deben ser un array.")
    .custom(async (value) => {
      if (value.length === 0) {
        return true;
      }

      const invalidIds = value.filter((id) => !id.match(/^[0-9a-fA-F]{24}$/));
      if (invalidIds.length > 0) {
        throw new Error("Uno o más ids de las etiquetas no son válidos.");
      }

      const existingTags = await TagModel.find({ _id: { $in: value } });
      if (existingTags.length !== value.length) {
        throw new Error("Una o más etiquetas no existen.");
      }
      return true;
    }),
];

export const getPostsValidations = [
  param("id")
    .notEmpty()
    .withMessage("El id de la publicación es obligatorio.")
    .isMongoId()
    .withMessage("El id de la publicación no es válido.")
    .custom(async (value) => {
      const post = await PostModel.findById(value);
      if (!post) {
        throw new Error("El post no existe.");
      }
      return true;
    }),
];

export const deletePostValidations = [
  param("id")
    .notEmpty()
    .withMessage("El id de la publicación es obligatorio.")
    .isMongoId()
    .withMessage("El id de la publicación no es válido.")
    .custom(async (value) => {
      const post = await PostModel.findById(value);
      if (!post) {
        throw new Error("El post no existe.");
      }
      return true;
    }),
];
