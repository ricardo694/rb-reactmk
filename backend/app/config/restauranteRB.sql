    CREATE DATABASE IF NOT EXISTS RestauranteRB;
    use RestauranteRB;

    CREATE TABLE Establecimiento (
        Id_Establecimiento INT(6) AUTO_INCREMENT PRIMARY KEY,
        Nombre_sede VARCHAR(30),
        Ciudad VARCHAR(20),
        Tipo_de_mesa VARCHAR(15),
        Responsable INT(10),
        Mesero VARCHAR(50)
    );


    CREATE TABLE Orden(
        Id_orden INT(6) AUTO_INCREMENT PRIMARY KEY,
        Fecha_orden date,
        Hora_orden TIME(6),
        Codigo_orden VARCHAR(30),
        Id_usuario INT(6),
        Id_pagos INT(6)
    );

    CREATE TABLE Pagos(
        Id_pagos INT(6) AUTO_INCREMENT PRIMARY KEY ,
        Tipo_pago VARCHAR(15),
        Cantidad_pago INT(10)
    );

    CREATE TABLE Usuario(
        Id_usuario INT(6)AUTO_INCREMENT PRIMARY KEY,
        Nombre VARCHAR(30),
        Apellido VARCHAR(30),
        Documento INT(10),
        Telefono VARCHAR(15),
        Correo_electronico VARCHAR(50),
        Contrasena VARCHAR(255),
        Tipo_usuario VARCHAR(15)
    );

    CREATE TABLE Producto(
        Id_producto INT(6) AUTO_INCREMENT PRIMARY KEY,
        Nombre_producto VARCHAR(100),
        Precio_producto INT(10),
        Tipo_producto VARCHAR(100),
        Descripcion VARCHAR (100),
        Imagen VARCHAR (255)
    );
    CREATE TABLE Contactos(
        Id_contacto INT(6)AUTO_INCREMENT PRIMARY KEY,
        Id_usuario INT(6),
        Mensaje VARCHAR(255)
    );

    /*------------------tablas intermedias-------------------*/

    CREATE TABLE Orden_Establecimiento(
        Id_orden INT(6),
        Id_establecimiento INT(6),
        PRIMARY KEY (Id_orden, Id_establecimiento),
        FOREIGN KEY (Id_orden) REFERENCES Orden(Id_orden),
        Foreign Key (Id_establecimiento) REFERENCES Establecimiento(Id_establecimiento)
    );

    CREATE TABLE Orden_Producto(
        Id_orden INT(6),
        Id_producto INT(6),
        Foreign Key (Id_orden) REFERENCES Orden(Id_orden),
        Foreign Key (Id_producto) REFERENCES producto(Id_producto)
    );

    CREATE TABLE Domicilio (
    Id_domicilio INT(6) AUTO_INCREMENT PRIMARY KEY,
    Id_orden INT(6),
    Id_usuario INT(6),
    Direccion_entrega VARCHAR(100),
    Estado VARCHAR(20) DEFAULT 'pendiente',   -- pendiente, en camino, entregado
    Fecha_solicitud DATE,
    Hora_solicitud TIME,

    FOREIGN KEY (Id_orden) REFERENCES Orden(Id_orden),
    FOREIGN KEY (Id_usuario) REFERENCES Usuario(Id_usuario)
);
CREATE TABLE Mesa (
    Id_mesa INT(6) AUTO_INCREMENT PRIMARY KEY,
    Id_establecimiento INT(6),
    Numero_mesa INT(4),
    Capacidad INT(4),
    Estado VARCHAR(20) DEFAULT 'disponible',   -- disponible, ocupada, inactiva

    FOREIGN KEY (Id_establecimiento) REFERENCES Establecimiento(Id_establecimiento)
);

CREATE TABLE Reserva (
    Id_reserva INT(6) AUTO_INCREMENT PRIMARY KEY,
    Id_usuario INT(6),
    Id_establecimiento INT(6),
    Id_mesa INT(6),
    Fecha_reserva DATE,
    Hora_reserva TIME,
    Numero_personas INT(4),
    Estado VARCHAR(20) DEFAULT 'activa',   -- activa, cancelada, cumplida

    FOREIGN KEY (Id_usuario) REFERENCES Usuario(Id_usuario),
    FOREIGN KEY (Id_establecimiento) REFERENCES Establecimiento(Id_establecimiento),
    FOREIGN KEY (Id_mesa) REFERENCES Mesa(Id_mesa)
);

     /*RELACIONES */
      /*------------------ USUARIO - ORDEN -------------------*/
    ALTER TABLE Orden ADD CONSTRAINT FK_ID1 FOREIGN KEY (Id_usuario) REFERENCES Usuario (Id_usuario);

        /*------------------ PAGOS - ORDEN -------------------*/
    ALTER TABLE Orden ADD CONSTRAINT FK_ID2 FOREIGN KEY (Id_pagos) REFERENCES Pagos (Id_pagos);

  /*------------------ USUARIO - CONTACTOS -------------------*/
    ALTER TABLE contactos ADD CONSTRAINT FK_ID3 FOREIGN KEY (Id_usuario) REFERENCES Usuario (Id_usuario);

    /*Consulta para agregar productos (de las tarjetas) */
INSERT INTO Producto (Nombre_producto, Precio_producto, Tipo_producto, Descripcion, Imagen)
VALUES

('Colombianas', 2000, 'Empanada', 'La empanada colombiana es una deliciosa y crujiente masa frita rellena de una mezcla sabrosa y jugosa.', '1-e.png'),
('Argentinas', 9000, 'Empanada', 'La empanada argentina es un plato tradicional...', '2-e.png'),
('Mixtas', 6000, 'Empanada', 'Una deliciosa combinación...', '3-e.png'),
('Chilenas', 2999, 'Empanada', 'La empanada chilena...', '4-e.png'),
('Ecuatorianas', 12000, 'Empanada', 'La empanada ecuatoriana...', '5-e.png'),
('Guatemaltecas', 1000, 'Empanada', 'La empanada guatemalteca...', '6-e.png'),

('Naranja', 200, 'Bebida', 'La bebida de naranja...', '1.png'),
('Manzana Verde', 300, 'Bebida', 'La bebida de manzana verde...', '2.png'),
('Frutos Rojos', 150, 'Bebida', 'La bebida de frutos rojos...', '3.png'),
('Coco', 999, 'Bebida', 'La bebida de coco...', '4.png'),
('Fresa', 320, 'Bebida', 'La bebida de fresa...', '5.png'),
('Maracuyá', 190, 'Bebida', 'La bebida de maracuyá...', '6.png'),

('Chocolate', 2500, 'Postre', 'Un delicioso postre de chocolate...', '1-p.png'),
('Tres Leches', 3000, 'Postre', 'El pastel de tres leches...', '2-p.png'),
('Mora', 2590, 'Postre', 'La mora es una fruta...', '3-p.png'),
('Kiwi', 999, 'Postre', 'El kiwi es una fruta...', '4-p.png'),
('Mango', 3620, 'Postre', 'El mango es una fruta tropical...', '5-p.png'),
('Helado', 1990, 'Postre', 'El helado de chocolate...', '6-p.png');

INSERT INTO Establecimiento (Nombre_sede, Ciudad, Tipo_de_mesa, Responsable, Mesero)
VALUES ('Sede Principal', 'Bogotá', 'Mixta', 1, 'Carlos Pérez');

INSERT INTO Establecimiento (Nombre_sede, Ciudad, Tipo_de_mesa, Responsable, Mesero)
VALUES ('Sede Norte', 'Medellín', 'Redonda', 2, 'Laura Gómez');

INSERT INTO Establecimiento (Nombre_sede, Ciudad, Tipo_de_mesa, Responsable, Mesero)
VALUES ('Sede Sur', 'Cali', 'Cuadrada', 3, 'Andrés Ramírez');

INSERT INTO Establecimiento (Nombre_sede, Ciudad, Tipo_de_mesa, Responsable, Mesero)
VALUES ('Sede Centro', 'Bogotá', 'Rectangular', 4, 'Mariana Torres');

INSERT INTO Establecimiento (Nombre_sede, Ciudad, Tipo_de_mesa, Responsable, Mesero)
VALUES ('Sede Este', 'Barranquilla', 'Mixta', 5, 'Jorge Martínez');

INSERT INTO Mesa (Id_establecimiento, Numero_mesa, Capacidad, Estado) VALUES
(1, 1, 2, 'disponible'),
(1, 2, 2, 'disponible'),
(1, 3, 4, 'disponible'),
(1, 4, 4, 'disponible'),
(1, 5, 6, 'disponible'),
(1, 6, 6, 'disponible'),
(1, 7, 8, 'disponible'),
(1, 8, 8, 'disponible'),
(1, 9, 10, 'disponible'),
(1, 10, 12, 'disponible');
INSERT INTO Usuario (Nombre, Apellido, Documento, Telefono, Correo_electronico, Contrasena, Tipo_usuario) 
VALUES ('Admin', 'Principal', 123456789, '3001234567', 'admin@restaurante.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'administrador');SET FOREIGN_KEY_CHECKS = 0;
SET FOREIGN_KEY_CHECKS = 1;

