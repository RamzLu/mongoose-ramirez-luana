import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";

export const createUserValidations = [
  body("username")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio.")
    .isLength({ min: 5 })
    .withMessage("El nombre de usuario debe tener al menos 5 caracteres.")
    .custom(async (value) => {
      const user = await UserModel.findOne({ username: value });
      if (user) {
        throw new Error("El nombre de usuario ya está en uso.");
      }
      return true;
    }),

  body("email")
    .notEmpty()
    .withMessage("El correo electrónico es obligatorio.")
    .isEmail()
    .withMessage("Por favor, ingresa un correo electrónico válido.")
    .custom(async (value) => {
      const user = await UserModel.findOne({ email: value });
      if (user) {
        throw new Error("El correo electrónico ya está registrado.");
      }
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria.")
    .isStrongPassword()
    .withMessage(
      "La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúcula, 1 número y al menos 1 signo especial."
    ),
];

export const updateUserValidations = [
  param("id")
    .isMongoId()
    .withMessage("El id del usuario no es válido.")
    .custom(async (value) => {
      const user = await UserModel.findById(value);
      if (!user) {
        throw new Error("El usuario no existe.");
      }
      return true;
    }),

  body("username")
    .optional()
    .isLength({ min: 5 })
    .withMessage("El nombre de usuario debe tener al menos 5 caracteres.")
    .custom(async (value, { req }) => {
      const user = await UserModel.findOne({ username: value });
      if (user && user._id.toString() !== req.params.id) {
        throw new Error("El nombre de usuario ya está en uso.");
      }
      return true;
    }),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Por favor, ingresa un correo electrónico válido.")
    .custom(async (value, { req }) => {
      const user = await UserModel.findOne({ email: value });
      if (user && user._id.toString() !== req.params.id) {
        throw new Error("El correo electrónico ya está registrado.");
      }
      return true;
    }),

  body("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage(
      "La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúcula, 1 número y al menos 1 signo especial."
    ),
];

export const getUserValidations = [
  param("id")
    .isMongoId()
    .withMessage("El id del usuario no es válido.")
    .custom(async (value) => {
      const user = await UserModel.findById(value);
      if (!user) {
        throw new Error("El usuario no existe o no ha sido encontrado.");
      }
      return true;
    }),
];

export const deleteUserValidations = [
  param("id")
    .isMongoId()
    .withMessage("El id del usuario no es válido.")
    .custom(async (value) => {
      const user = await UserModel.findById(value);
      if (!user) {
        throw new Error("El usuario no existe.");
      }
      return true;
    }),
];
