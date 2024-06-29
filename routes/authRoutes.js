import express from "express";
import { register, login } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import conexion from "../DB/db.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", (req, res) => {
  conexion();
  res.render("index");
});

router.get("/admin", authMiddleware, (req, res) => {
  res.status(200).send(`Bienvenido ${req.userId}`);
});

export default router;
