import { Router } from "express";
import { body } from "express-validator";

import { register } from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),

    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
  ],
  validate,
  register
);

export default router;
