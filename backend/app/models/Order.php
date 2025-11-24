<?php
class Order {
    private $conn;
    private $table_name = "Orden";

    public $Id_orden;
    public $Fecha_orden;
    public $Hora_orden;
    public $Codigo_orden;
    public $Id_usuario;
    public $Id_pagos;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Obtener órdenes del usuario
    public function readByUser($userId) {
        $query = "SELECT o.*, p.Tipo_pago, p.Cantidad_pago 
                  FROM " . $this->table_name . " o
                  LEFT JOIN Pagos p ON o.Id_pagos = p.Id_pagos
                  WHERE o.Id_usuario = :Id_usuario";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":Id_usuario", $userId);
        $stmt->execute();
        return $stmt;
    }

    // Obtener todas las órdenes (solo admin)
    public function readAll() {
        $query = "SELECT o.*, u.Nombre, u.Apellido, p.Tipo_pago, p.Cantidad_pago 
                  FROM " . $this->table_name . " o
                  LEFT JOIN Usuario u ON o.Id_usuario = u.Id_usuario
                  LEFT JOIN Pagos p ON o.Id_pagos = p.Id_pagos";
        
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
    // Crear nueva orden
public function create() {
    $query = "INSERT INTO " . $this->table_name . " 
              SET Fecha_orden=CURDATE(), Hora_orden=CURTIME(), 
                  Codigo_orden=:Codigo_orden, Id_usuario=:Id_usuario, Id_pagos=:Id_pagos";
    
    $stmt = $this->conn->prepare($query);
    
    // Generar código único para la orden
    $this->Codigo_orden = uniqid('ORD_');
    
    $stmt->bindParam(":Codigo_orden", $this->Codigo_orden);
    $stmt->bindParam(":Id_usuario", $this->Id_usuario);
    $stmt->bindParam(":Id_pagos", $this->Id_pagos);
    
    if($stmt->execute()) {
        $this->Id_orden = $this->conn->lastInsertId();
        return true;
    }
    return false;
}

// Agregar producto a orden
public function addProduct($productId, $cantidad = 1) {
    $query = "INSERT INTO Orden_Producto (Id_orden, Id_producto) 
              VALUES (:Id_orden, :Id_producto)";
    
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(":Id_orden", $this->Id_orden);
    $stmt->bindParam(":Id_producto", $productId);
    
    // Insertar múltiples veces según la cantidad
    for($i = 0; $i < $cantidad; $i++) {
        if(!$stmt->execute()) {
            return false;
        }
    }
    return true;
}

// Obtener productos de una orden
public function getOrderProducts() {
    $query = "SELECT p.*, COUNT(*) as cantidad 
              FROM Orden_Producto op 
              JOIN Producto p ON op.Id_producto = p.Id_producto 
              WHERE op.Id_orden = :Id_orden 
              GROUP BY p.Id_producto";
    
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(":Id_orden", $this->Id_orden);
    $stmt->execute();
    
    return $stmt;
}
}
?>