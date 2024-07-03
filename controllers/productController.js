import conexion from "../DB/db.js";

//Crear un producto
export const createProduct = async (req, res) => {
  const products = req.body;

  const [results] = await conexion.query(`INSERT INTO productos SET ?`, [
    products,
  ]);
  try {
    res.json(results);
    console.log(`id del nuevo producto: ${results.insertId}`);
  } catch (error) {
    res.status(500).send("Internal error");
  }
};

//Traer todos los productos
export const getProducts = async (req, res) => {
  const [results] =
    await conexion.query(`SELECT productos.id, productos.title, productos.price, productos.image, 
                categoria.type AS categoria, promos.descuento FROM productos 
                JOIN categoria ON productos.id_categoria = categoria.id_categoria 
                LEFT JOIN  promos ON productos.id = promos.id;`);
  try {
    res.json(results);
  } catch (error) {
    res.status(500).send("Internal error");
  }
};

//Traer un producto
export const getProduct = async (req, res) => {
  const id = req.params.id;
  const [results] = await conexion.query(
    "SELECT productos.title, productos.price, productos.image, categoria.type AS categoria, promos.descuento FROM productos JOIN categoria ON productos.id_categoria = categoria.id_categoria LEFT JOIN  promos ON productos.id = promos.id WHERE productos.id = ?",
    [id]
  );
  try {
    res.json(results[0]);
  } catch (error) {
    res.status(500).send("Internal error");
  }
};

//Actualizar un producto
export const updateProduct = async (req, res) => {
  const id = req.params.id;
  const products = req.body;
  const [results] = await conexion.query(
    "UPDATE productos SET ? WHERE id = ?",
    [products, id]
  );
  try {
    res.json(results[0]);
    console.log(`Producto actualizado id: ${id}`);
  } catch (error) {
    res.status(500).send("Internal error");
  }
};

//Eliminar un producto
export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  const [results] = await conexion.query("DELETE FROM productos WHERE id = ?", [
    id,
  ]);
  try {
    res.json(results);
    console.log(`producto Eliminado id: ${id}`);
  } catch (error) {
    res.status(500).send("Internal error");
  }
};

// {
//   "codigo": "HE-01",
//   "title": "Horno eléctrico Clever",
//   "image": "../IMG/productos/hornoElectricoClever.webp",
//   "price": 732172,
//   "id_categoria": 1,
//   "id_admin": 1
//  }
