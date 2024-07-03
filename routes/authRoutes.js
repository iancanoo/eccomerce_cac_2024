import express from "express";
import { register, login } from "../controllers/authController.js";
import * as product from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import conexion from "../DB/db.js";

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
  const userId = req.userId;

  // Consulta para obtener el nombre de usuario asociado con el userId
  conexion.query(
    "SELECT usuario FROM admins WHERE id_admin = ?",
    [userId],
    (error, results) => {
      if (error) {
        console.error("Error al consultar la base de datos:", error);
        return res.status(500).send("Error al obtener el nombre de usuario");
      }

      if (results.length === 0) {
        return res.status(404).send("Usuario no encontrado");
      }

      const username = results[0].username;
      res.status(200).send(`Hola ${username}`);
    }
  );
});

//Rutas de productos
router.post("/productos", product.createProduct);
router.get("/productos", product.getProducts);
router.get("/producto/:id", product.getProduct);
router.put("/producto/:id", product.updateProduct);
router.delete("/producto/:id", product.deleteProduct);

export default router;
