import { Router } from "express";

import { generateDesign, refineDesign } from "../controllers/ai.controller.js";

const router = Router();

router.post("/generate", generateDesign);
router.post("/refine", refineDesign);

export default router;
