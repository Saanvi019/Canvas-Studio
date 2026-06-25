import { Router } from "express";

import { auth } from "../middleware/auth.js";

import {
  saveVersion,
  getVersions,
  getVersion,
} from "../controllers/version.controller.js";

const router = Router({ mergeParams: true });

router.post("/", auth, saveVersion);

router.get("/", auth, getVersions);

router.get("/:vnum", auth, getVersion);

export default router;
