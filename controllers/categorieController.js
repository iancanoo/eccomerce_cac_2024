import express from "express";
import pool from "../DB/db.js";

// CRUD para categorías
// app.get("/categorias", async (req, res) => {
export const getCategorias = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM categoria");
    res.send(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// app.post("/categorias", async (req, res) => {
export const createCategorias = async (req, res) => {
  const { type, name } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO categoria (type, name) VALUES (?, ?)",
      [type, name]
    );
    res.send({ id: result.insertId, type, name });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// app.put("/categorias/:id", async (req, res) => {
export const updateCategoria = async (req, res) => {
  const { id } = req.params;
  const { type, name } = req.body;
  try {
    await pool.query(
      "UPDATE categoria SET type = ?, name = ? WHERE id_categoria = ?",
      [type, name, id]
    );
    res.send({ id, type, name });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// app.delete("/categorias/:id", async (req, res) => {
export const deleteCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM categoria WHERE id_categoria = ?", [id]);
    res.send({ id });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//---------------------------------------
