import { Router } from "express";
import { body } from "express-validator";

import {
  register,
  login,
  refresh,
  logout,
} from "../controllers/auth.controller.js";
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
router.post(
  "/login",
  [body("email").isEmail(), body("password").notEmpty()],
  validate,
  login
);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;
