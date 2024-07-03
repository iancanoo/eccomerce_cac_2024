CREATE DATABASE tienda;
USE tienda;

CREATE TABLE admins(
id int auto_increment PRIMARY KEY,
usuario varchar(50) NOT NULL,
contraseña varchar(250) NOT NULL
);

CREATE TABLE categoria(
id_categoria int auto_increment PRIMARY KEY,
type varchar(10) NOT NULL,
name varchar(30) NOT NULL
);

CREATE TABLE productos(
id int auto_increment PRIMARY KEY,
codigo varchar(30) NOT NULL,
title varchar(30) NOT NULL,
image varchar(50) NOT NULL,
price varchar(30) NOT NULL,
id_categoria int NOT NULL,
id_admin int,
foreign key(id_categoria) references categoria(id_categoria),
foreign key(id_admin) references admins(id)
);

CREATE TABLE promos(
id_promo int auto_increment PRIMARY KEY,
id int,
descuento double,
foreign key(id) references productos(id)
);

-- Insertar datos en la tabla admins
INSERT INTO admins (usuario, contraseña) VALUES 
('admin1', '12345'), 
('admin2', '12345');

-- Insertar datos en la tabla categoria
INSERT INTO categoria ( type, name) VALUES 
( 'Cocina', 'Categoria 1'), 
( 'Baño', 'Categoria 2');

-- Insertar datos en la tabla productos
INSERT INTO productos (codigo, title, image, price, id_categoria, id_admin) VALUES 
('ANF-02', 'Anafe eléctrico Clever', '../IMG/productos/anafeClaver.webp', 406290, 1, 1), 
('PDA-01', 'Purificador de aire Hydra', '../IMG/productos/purificadordeaire.webp', 174849, 2, 2);

-- Insertar datos en la tabla promos
INSERT INTO promos (id, descuento) VALUES 
(1, 0.10), 
(2, 0.15);

-- Seleccionar todos los registros de la tabla admins
SELECT * FROM admins;

-- Seleccionar todos los registros de la tabla categoria
SELECT * FROM categoria;

-- Seleccionar todos los registros de la tabla productos
SELECT * FROM productos;

-- Seleccionar todos los registros de la tabla promos
SELECT * FROM promos;


-- Seleccionar todos los productos en el back
SELECT productos.title, productos.price, productos.image, 
categoria.type AS categoria, promos.descuento FROM productos 
JOIN categoria ON productos.id_categoria = categoria.id_categoria 
LEFT JOIN  promos ON productos.id = promos.id;

-- Seleccionar los productos segun el ID en el back
SELECT productos.title, productos.price, productos.image, 
categoria.type AS categoria, promos.descuento FROM productos 
JOIN categoria ON productos.id_categoria = categoria.id_categoria 
LEFT JOIN  promos ON productos.id = promos.id WHERE productos.id = ?