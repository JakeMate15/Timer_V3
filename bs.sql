-- Eliminar la base de datos si ya existe
show databases;

DROP DATABASE IF EXISTS speedcubing_timer;

-- Crear la base de datos
CREATE DATABASE speedcubing_timer;
USE speedcubing_timer;

-- Crear la tabla Usuarios
CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL,
    contrasena VARCHAR(50) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    nombre VARCHAR(255) NOT NULL
);

-- Crear la tabla Categoria
CREATE TABLE Categoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- Insertar valores en la tabla Categoria
INSERT INTO Categoria (nombre) VALUES ('wca'), ('cruzR'), ('LL'), ('esquinas'), ('aristas');
select * from Categoria;

-- Crear la tabla Sesiones
CREATE TABLE Sesiones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    usuario_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
);

-- Crear la tabla Intentos
CREATE TABLE Intentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATETIME NOT NULL,
    tiempo INT NOT NULL, -- en milisegundos
    sesion_id INT NOT NULL,
    categoria_id INT NOT NULL,
    FOREIGN KEY (sesion_id) REFERENCES Sesiones(id),
    FOREIGN KEY (categoria_id) REFERENCES Categoria(id)
);

-- Crear la tabla Amigos
CREATE TABLE Amigos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    amigo_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id),
    FOREIGN KEY (amigo_id) REFERENCES Usuarios(id),
    UNIQUE (usuario_id, amigo_id)
);
