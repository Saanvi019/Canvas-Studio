import { Router } from "express";
import { aiRateLimiter } from "../middleware/aiRateLimiter.js";

import {
  generateDesign,
  refineDesign,
  generateFromImage,
} from "../controllers/ai.controller.js";
import { upload } from "../middleware/upload.js";

const router = Router();

router.use(aiRateLimiter);
router.post("/generate", generateDesign);
router.post("/refine", refineDesign);
router.post("/from-image", upload.single("image"), generateFromImage);

export default router;
