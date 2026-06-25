import { Router } from "express";

import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";
import versionRoutes from "./version.routes.js";

import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/", auth, createProject);

router.get("/", auth, getProjects);

router.get("/:id", auth, getProjectById);

router.put("/:id", auth, updateProject);

router.delete("/:id", auth, deleteProject);

router.use("/:id/versions", versionRoutes);

export default router;
