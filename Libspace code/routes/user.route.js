import express from "express";
import authController from "../controller/authController.js";

const router = express.Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);
router.delete("/:userId", authController.deleteUser);

export default router;