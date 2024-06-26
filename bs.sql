CREATE DATABASE speedcubing_timer;
USE speedcubing_timer;

CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE Categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Sesiones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria_id INT NOT NULL,
    usuario_id INT NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES Categorias(id),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
);

CREATE TABLE Intentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATETIME NOT NULL,
    tiempo INT NOT NULL, -- en milisegundos
    sesion_id INT NOT NULL,
    categoria_id INT NOT NULL,
    FOREIGN KEY (sesion_id) REFERENCES Sesiones(id),
    FOREIGN KEY (categoria_id) REFERENCES Categorias(id)
);

-- Tabla de Amigos
CREATE TABLE Amigos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    amigo_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id),
    FOREIGN KEY (amigo_id) REFERENCES Usuarios(id),
    UNIQUE (usuario_id, amigo_id)
);
