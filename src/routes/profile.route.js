import { Router } from "express";
import {
  createProfile,
  deleteProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
} from "../controllers/profile.controller.js";
import { validator } from "../middlewares/validator.js";
import {
  createProfileValidations,
  deleteProfileValidations,
  getProfileValidations,
  updateProfileValidations,
} from "../middlewares/validations/profile.validations.js";
export const routeProfile = Router();

routeProfile.post(
  "/profiles",
  createProfileValidations,
  validator,
  createProfile
);
routeProfile.get("/profiles", getAllProfiles);
routeProfile.get(
  "/profiles/:id",
  getProfileValidations,
  validator,
  getProfileById
);
routeProfile.put(
  "/profiles/:id",
  updateProfileValidations,
  validator,
  updateProfile
);
routeProfile.delete(
  "/profiles/:id",
  deleteProfileValidations,
  validator,
  deleteProfile
);
