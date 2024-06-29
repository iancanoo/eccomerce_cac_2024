import express from "express";
import { register, login } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

//Router para controlador
router.post("/register", register);
router.post("/login", login);

//Router para las vistas
router.get("/", (req, res) => {
  res.render("index");
});
router.get("/register", (req, res) => {
  res.render("register");
});
router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/admin", authMiddleware, (req, res) => {
  res.status(200).send(`Bienvenido ${req.userId}`);
});

export default router;
