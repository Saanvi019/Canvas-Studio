import { Router } from "express";

import { generateDesign } from "../controllers/ai.controller.js";

const router = Router();

router.post("/generate", generateDesign);

export default router;
