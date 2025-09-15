import { Router } from "express";
import {
  createProfile,
  deleteProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
} from "../controllers/profile.controller.js";

export const routeProfile = Router();

routeProfile.post("/profiles", createProfile);
routeProfile.get("/profiles", getAllProfiles);
routeProfile.get("/profiles/:id", getProfileById);
routeProfile.put("/profiles/:id", updateProfile);
routeProfile.delete("/profiles/:id", deleteProfile);
