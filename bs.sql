CREATE DATABASE speedcubing_timer;
USE speedcubing_timer;

CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL,
    contrasena VARCHAR(50) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    nombre VARCHAR(255) NOT NULL
);

CREATE TABLE Categoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

INSERT INTO Categoria (nombre) VALUES ('wca'), ('cruzR'), ('LL'), ('esquinas'), ('aristas');

CREATE TABLE Sesiones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    usuario_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
);

CREATE TABLE Intentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATETIME NOT NULL,
    tiempo INT NOT NULL, 
    sesion_id INT NOT NULL,
    categoria_id INT NOT NULL,
    FOREIGN KEY (sesion_id) REFERENCES Sesiones(id),
    FOREIGN KEY (categoria_id) REFERENCES Categoria(id)
);

CREATE TABLE Amigos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    amigo_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id),
    FOREIGN KEY (amigo_id) REFERENCES Usuarios(id),
    UNIQUE (usuario_id, amigo_id)
);


SELECT 
    Intentos.id AS intento_id,
    Intentos.fecha,
    Intentos.tiempo,
    Categoria.nombre AS categoria_nombre,
    Sesiones.nombre AS sesion_nombre,
    Usuarios.id AS usuario_id,
    Usuarios.usuario AS nombre_usuario,
    Usuarios.nombre AS nombre_completo
FROM 
    Intentos
INNER JOIN 
    Sesiones ON Intentos.sesion_id = Sesiones.id
INNER JOIN 
    Categoria ON Intentos.categoria_id = Categoria.id
INNER JOIN 
    Usuarios ON Sesiones.usuario_id = Usuarios.id
WHERE 
    Usuarios.id = 1;
    
    
select * from intentos;



SELECT 
    Intentos.id AS intento_id,
    Intentos.fecha,
    Intentos.tiempo,
    Categoria.nombre AS categoria_nombre,
    Usuarios.id AS usuario_id,
    Usuarios.usuario AS nombre_usuario,
    Usuarios.nombre AS nombre_completo
FROM 
    Intentos
INNER JOIN 
    Sesiones ON Intentos.sesion_id = Sesiones.id
INNER JOIN 
    Categoria ON Intentos.categoria_id = Categoria.id
INNER JOIN 
    Usuarios ON Sesiones.usuario_id = Usuarios.id
INNER JOIN 
    (
        SELECT 
            categoria_id, 
            MIN(tiempo) AS mejor_tiempo
        FROM 
            Intentos
        GROUP BY 
            categoria_id
    ) AS MejoresIntentos 
ON 
    Intentos.categoria_id = MejoresIntentos.categoria_id 
    AND Intentos.tiempo = MejoresIntentos.mejor_tiempo;

ALTER TABLE Intentos ADD COLUMN scramble VARCHAR(255);


SELECT 
    Intentos.id AS intento_id,
    Intentos.fecha,
    Intentos.tiempo,
    Categoria.nombre AS categoria_nombre,
    Usuarios.id AS usuario_id,
    Usuarios.usuario AS nombre_usuario,
    Usuarios.nombre AS nombre_completo
FROM 
    Intentos
INNER JOIN 
    Sesiones ON Intentos.sesion_id = Sesiones.id
INNER JOIN 
    Categoria ON Intentos.categoria_id = Categoria.id
INNER JOIN 
    Usuarios ON Sesiones.usuario_id = Usuarios.id
INNER JOIN 
    (
        SELECT 
            categoria_id, 
            MIN(tiempo) AS mejor_tiempo
        FROM 
            Intentos
        INNER JOIN 
            Sesiones ON Intentos.sesion_id = Sesiones.id
        WHERE 
            Sesiones.usuario_id = 1
        GROUP BY 
            categoria_id
    ) AS MejoresIntentos 
ON 
    Intentos.categoria_id = MejoresIntentos.categoria_id 
    AND Intentos.tiempo = MejoresIntentos.mejor_tiempo
WHERE
    Usuarios.id = 1;


select * from Usuarios;
select * from Amigos;



SELECT 
    Intentos.id AS intento_id,
    Intentos.fecha,
    Intentos.tiempo,
    Categoria.nombre AS categoria_nombre,
    Usuarios.id AS usuario_id,
    Usuarios.usuario AS nombre_usuario,
    Usuarios.nombre AS nombre_completo
FROM 
    Intentos
INNER JOIN 
    Sesiones ON Intentos.sesion_id = Sesiones.id
INNER JOIN 
    Categoria ON Intentos.categoria_id = Categoria.id
INNER JOIN 
    Usuarios ON Sesiones.usuario_id = Usuarios.id
INNER JOIN 
    (
        SELECT 
            categoria_id, 
            MIN(tiempo) AS mejor_tiempo,
            Sesiones.usuario_id
        FROM 
            Intentos
        INNER JOIN 
            Sesiones ON Intentos.sesion_id = Sesiones.id
        WHERE 
            Sesiones.usuario_id IN (
                SELECT amigo_id 
                FROM Amigos 
                WHERE usuario_id = 1
            )
        GROUP BY 
            categoria_id, Sesiones.usuario_id
    ) AS MejoresIntentos 
ON 
    Intentos.categoria_id = MejoresIntentos.categoria_id 
    AND Intentos.tiempo = MejoresIntentos.mejor_tiempo
    AND Sesiones.usuario_id = MejoresIntentos.usuario_id;







SELECT 
    Usuarios.id AS amigo_id,
    Usuarios.usuario AS nombre_usuario,
    Usuarios.nombre AS nombre_completo
FROM 
    Amigos
INNER JOIN 
    Usuarios ON Amigos.amigo_id = Usuarios.id
WHERE 
    Amigos.usuario_id = 1
    AND Usuarios.id != 1;


