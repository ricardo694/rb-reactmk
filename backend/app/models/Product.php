<?php
class Product {
    private $conn;
    private $table_name = "Producto";

    public $Id_producto;
    public $Nombre_producto;
    public $Precio_producto;
    public $Tipo_producto;
    public $Descripcion;
    public $Imagen;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Obtener todos los productos
    public function readAll() {
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Obtener producto por ID
    public function readOne() {
        $query = "SELECT * FROM " . $this->table_name . " 
                  WHERE Id_producto = :Id_producto";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":Id_producto", $this->Id_producto);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Crear producto (solo admin)
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                 SET Nombre_producto=:Nombre_producto, Precio_producto=:Precio_producto, 
                     Tipo_producto=:Tipo_producto, Descripcion=:Descripcion, Imagen=:Imagen";
        
        $stmt = $this->conn->prepare($query);

        // Sanitizar datos
        $this->Nombre_producto = htmlspecialchars(strip_tags($this->Nombre_producto));
        $this->Tipo_producto = htmlspecialchars(strip_tags($this->Tipo_producto));
        $this->Descripcion = htmlspecialchars(strip_tags($this->Descripcion));
        $this->Imagen = htmlspecialchars(strip_tags($this->Imagen));

        // Bind parameters
        $stmt->bindParam(":Nombre_producto", $this->Nombre_producto);
        $stmt->bindParam(":Precio_producto", $this->Precio_producto);
        $stmt->bindParam(":Tipo_producto", $this->Tipo_producto);
        $stmt->bindParam(":Descripcion", $this->Descripcion);
        $stmt->bindParam(":Imagen", $this->Imagen);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }





    // Actualizar producto
public function update() {
    $query = "UPDATE " . $this->table_name . " 
              SET Nombre_producto=:Nombre_producto, Precio_producto=:Precio_producto, 
                  Tipo_producto=:Tipo_producto, Descripcion=:Descripcion, Imagen=:Imagen 
              WHERE Id_producto = :Id_producto";

    $stmt = $this->conn->prepare($query);

    // Sanitizar datos
    $this->Nombre_producto = htmlspecialchars(strip_tags($this->Nombre_producto));
    $this->Tipo_producto = htmlspecialchars(strip_tags($this->Tipo_producto));
    $this->Descripcion = htmlspecialchars(strip_tags($this->Descripcion));
    $this->Imagen = htmlspecialchars(strip_tags($this->Imagen));

    // Bind parameters
    $stmt->bindParam(":Nombre_producto", $this->Nombre_producto);
    $stmt->bindParam(":Precio_producto", $this->Precio_producto);
    $stmt->bindParam(":Tipo_producto", $this->Tipo_producto);
    $stmt->bindParam(":Descripcion", $this->Descripcion);
    $stmt->bindParam(":Imagen", $this->Imagen);
    $stmt->bindParam(":Id_producto", $this->Id_producto);

    if($stmt->execute()) {
        return true;
    }
    return false;
    }

    // Eliminar producto
    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE Id_producto = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->Id_producto);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }
}
?>