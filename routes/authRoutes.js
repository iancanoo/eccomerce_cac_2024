import express from "express";
import { register, login } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/admin", authMiddleware, (req, res) => {
  res.status(200).send(`Bienvenido ${req.userId}`);
});

export default router;
