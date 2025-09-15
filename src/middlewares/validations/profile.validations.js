import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";
import { ProfileModel } from "../../models/profile.model.js";

export const createProfileValidations = [
  body("first_name")
    .notEmpty()
    .withMessage("El nombre es obligatorio.")
    .isString()
    .withMessage("El nombre debe ser una cadena de texto."),

  body("last_name")
    .notEmpty()
    .withMessage("El apellido es obligatorio.")
    .isString()
    .withMessage("El apellido debe ser una cadena de texto."),

  body("address.street")
    .notEmpty()
    .withMessage("La calle es obligatoria.")
    .isString()
    .withMessage("La calle debe ser una cadena de texto."),

  body("address.street_number")
    .notEmpty()
    .withMessage("El número de calle es obligatorio.")
    .isInt({ gt: 0 })
    .withMessage("El número de calle debe ser un número entero positivo."),

  body("User")
    .notEmpty()
    .withMessage("El id del usuario es obligatorio.")
    .isMongoId()
    .withMessage("El id del usuario no es válido.")
    .custom(async (value) => {
      const user = await UserModel.findById(value);
      if (!user) {
        throw new Error("El usuario no existe.");
      }

      const profile = await ProfileModel.findOne({ User: value });
      if (profile) {
        throw new Error("Este usuario ya tiene un perfil.");
      }
      return true;
    }),

  body("profile_picture_URL")
    .optional()
    .isURL()
    .withMessage("La URL de la foto de perfil no es válida."),

  body("social_media.X")
    .optional()
    .isString()
    .withMessage("El nombre de usuario de X debe ser una cadena de texto."),

  body("social_media.Instagram")
    .optional()
    .isString()
    .withMessage(
      "El nombre de usuario de Instagram debe ser una cadena de texto."
    ),
];

export const updateProfileValidations = [
  param("id")
    .notEmpty()
    .withMessage("El id del perfil es obligatorio.")
    .isMongoId()
    .withMessage("El id del perfil no es válido.")
    .custom(async (value) => {
      const profile = await ProfileModel.findById(value);
      if (!profile) {
        throw new Error("El perfil no existe.");
      }
      return true;
    }),
  body("first_name")
    .optional()
    .notEmpty()
    .withMessage("El nombre no puede estar vacío.")
    .isString()
    .withMessage("El nombre debe ser una cadena de texto."),

  body("last_name")
    .optional()
    .notEmpty()
    .withMessage("El apellido no puede estar vacío.")
    .isString()
    .withMessage("El apellido debe ser una cadena de texto."),

  body("address.street")
    .optional()
    .notEmpty()
    .withMessage("La calle no puede estar vacía.")
    .isString()
    .withMessage("La calle debe ser una cadena de texto."),

  body("address.street_number")
    .optional()
    .notEmpty()
    .withMessage("El número de calle no puede estar vacío.")
    .isInt({ gt: 0 })
    .withMessage("El número de calle debe ser un número entero positivo."),

  body("profile_picture_URL")
    .optional()
    .isURL()
    .withMessage("La URL de la foto de perfil no es válida."),

  body("social_media.X")
    .optional()
    .isString()
    .withMessage("El nombre de usuario de X debe ser una cadena de texto."),

  body("social_media.Instagram")
    .optional()
    .isString()
    .withMessage(
      "El nombre de usuario de Instagram debe ser una cadena de texto."
    ),
];

export const getProfileValidations = [
  param("id")
    .notEmpty()
    .withMessage("El id del perfil es obligatorio.")
    .isMongoId()
    .withMessage("El id del perfil no es válido.")
    .custom(async (value) => {
      const profile = await ProfileModel.findById(value);
      if (!profile) {
        throw new Error("El perfil no existe.");
      }
      return true;
    }),
];

export const deleteProfileValidations = [
  param("id")
    .notEmpty()
    .withMessage("El id del perfil es obligatorio.")
    .isMongoId()
    .withMessage("El id del perfil no es válido.")
    .custom(async (value) => {
      const profile = await ProfileModel.findById(value);
      if (!profile) {
        throw new Error("El perfil no existe.");
      }
      return true;
    }),
];
