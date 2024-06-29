// authController.js

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import users from "../models/userModel.js";
import conexion from "../DB/db.js";
import configs from "../config/config.js";
import promisefy from "util";

//Registro
// export const register = (req, res) => {
//   const { username, password } = req.body;
//   console.log(username + " - " + password);

//   // const hashedPassword = bcrypt.hashSync(password, 8);

//   // const newUser = { id: users.length + 1, username, password: hashedPassword };
//   // users.push(newUser);

//   // const token = jwt.sign({ id: newUser.id }, configs.secretKey, {
//   //   expiresIn: configs.tokenExpiresIn,
//   // });

//   // res.status(201).send({ auth: true, token });
// };
export const register = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username + " - " + password);
};

//Login
export const login = (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) return res.status(404).send("User not found");

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid)
    return res.status(404).send({ auth: false, token: null });

  const token = jwt.sign({ id: user.id }, configs.secretKey, {
    expiresIn: configs.tokenExpiresIn,
  });

  res.status(200).send({ auth: true, token });
};
