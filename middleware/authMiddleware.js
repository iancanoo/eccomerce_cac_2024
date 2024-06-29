import jwt from "jsonwebtoken";
import * as config from "../config/config.js";
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader)
    return res.status(404).send({
      auth: false,
      message: "No se obtuvo un Token",
    });

  const token = authHeader.split(" ")[1];

  if (!token)
    return res.status(404).send({
      auth: false,
      message: "malformed token",
    });

  jwt.verify(token, config.secretKey, (err, decoded) => {
    if (err)
      return res.status(500).json({
        auth: false,
        message: "Failed to authorization token",
      });

    req.userId = decoded.id;

    next();
  });
};

export default authMiddleware;
