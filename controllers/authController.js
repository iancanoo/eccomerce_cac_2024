// authController.js

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import conexion from "../DB/db.js";
import configs from "../config/config.js";

//Registro
export const register = (req, res) => {
  try {
    const { username, password } = req.body;
    let hashedPassword = bcrypt.hashSync(password, 8);
    // console.log(hashedPassword);
    conexion.query(
      "INSERT INTO admins SET ?",
      {
        usuario: username,
        contraseña: hashedPassword,
      },
      (error, results) => {
        if (error) {
          return res.status(500).send("Error registering user.");
        }
        const token = jwt.sign({ id: results.insertId }, configs.secretKey, {
          expiresIn: configs.tokenExpiresIn,
        });
        res.status(201).send({ auth: true, token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

//Login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const [results] = await conexion.query(
      "SELECT * FROM admins WHERE usuario = ?",
      [username]
    );

    if (results.length === 0) {
      return res.status(404).send("User not found.");
    }

    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.contraseña);

    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, token: null });
    }

    const token = jwt.sign({ id: user.id_admin }, configs.secretKey, {
      expiresIn: configs.tokenExpiresIn,
    });

    res.status(200).send({ auth: true, token });
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
};
