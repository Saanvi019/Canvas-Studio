import { Router } from "express";

import {
  generateDesign,
  refineDesign,
  generateFromImage,
} from "../controllers/ai.controller.js";
import { upload } from "../middleware/upload.js";

const router = Router();

router.post("/generate", generateDesign);
router.post("/refine", refineDesign);
router.post("/from-image", upload.single("image"), generateFromImage);

export default router;
