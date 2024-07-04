import pool from "../DB/db.js";

// CRUD para promociones
// app.get("/promos", async (req, res) => {
export const getPromos = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM promos");
    res.send(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// app.post("/promos", async (req, res) => {
export const createPromos = async (req, res) => {
  const { id, descuento } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO promos (id, descuento) VALUES (?, ?)",
      [id, descuento]
    );
    res.send({ id: result.insertId, id, descuento });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// app.put("/promos/:id", async (req, res) => {
export const updatePromo = async (req, res) => {
  const { id } = req.params;
  const { descuento } = req.body;
  try {
    await pool.query("UPDATE promos SET descuento = ? WHERE id_promo = ?", [
      descuento,
      id,
    ]);
    res.send({ id, descuento });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// app.delete("/promos/:id", async (req, res) => {
export const deletePromo = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM promos WHERE id_promo = ?", [id]);
    res.send({ id });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
