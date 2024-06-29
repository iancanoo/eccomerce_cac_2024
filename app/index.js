import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "../routes/authRoutes.js";

//SERVIDOR
const app = express();
const PORT = process.env.PORT || 3000;

//seteamos la carpeta public
app.use(express.static("public"));

//Procesamiento de datos desde formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//llamado al Router
app.use("/auth", authRoutes);

//Seteamos las variables de entorno
dotenv.config({ path: "./env/.env" });

//Cookies
// app.use(cookieParser);

app.listen(PORT, () => {
  console.log(`servidor corriendo en puerto: ${PORT}`);
});
