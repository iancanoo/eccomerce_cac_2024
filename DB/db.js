import { createPool } from "mysql2/promise";

//Conexion con pool
// const pool = createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_DATABASE,
//   connectionLimit: 5,
// });
const pool = createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "tienda",
  connectionLimit: 5,
});
//Verificacion de conexion
pool
  .getConnection()
  .then((connection) => {
    console.log("Connected to the database");
    connection.release();
  })
  .catch((error) => {
    console.log("Error connect to the database", error);
    console.log("DB_HOST:", process.env.DB_HOST);
    console.log("DB_USER:", process.env.DB_USER);
    console.log("DB_PASS:", process.env.DB_PASS);
    console.log("DB_DATABASE:", process.env.DB_DATABASE);
  });

export default pool;
