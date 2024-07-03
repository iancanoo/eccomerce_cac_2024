import jwt from "jsonwebtoken";
import * as config from "../config/config.js";

const authMiddleware = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return res
      .status(403)
      .send({ auth: false, message: "No se obtuvo un token" });

  jwt.verify(token, config.secretKey, (err, decoded) => {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    req.id = decoded.id;
    next();
    console.log(err);
  });
};

export default authMiddleware;
