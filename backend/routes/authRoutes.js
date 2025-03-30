import express from "express";
import {
  register,
  login,
  forgotPassword,
  changePassword,
  resetPassword,
} from "../controllers/authController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/change-password", auth, changePassword);
router.post("/reset-password/:token", resetPassword);

export default router;
