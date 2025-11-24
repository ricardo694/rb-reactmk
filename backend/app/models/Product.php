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

    // Crear producto
    public function create() {
    $query = "INSERT INTO " . $this->table_name . " 
             SET Nombre_producto=:Nombre_producto, 
                 Precio_producto=:Precio_producto, 
                 Tipo_producto=:Tipo_producto, 
                 Descripcion=:Descripcion, 
                 Imagen=:Imagen";

    $stmt = $this->conn->prepare($query);

    $this->Nombre_producto = htmlspecialchars(strip_tags($this->Nombre_producto));
    $this->Tipo_producto   = htmlspecialchars(strip_tags($this->Tipo_producto));
    $this->Descripcion     = htmlspecialchars(strip_tags($this->Descripcion));
    // Imagen NO se sanea si es archivo

    $stmt->bindParam(":Nombre_producto", $this->Nombre_producto);
    $stmt->bindParam(":Precio_producto", $this->Precio_producto);
    $stmt->bindParam(":Tipo_producto", $this->Tipo_producto);
    $stmt->bindParam(":Descripcion", $this->Descripcion);
    $stmt->bindParam(":Imagen", $this->Imagen);

    return $stmt->execute();
}

    // Obtener imagen actual
    public function getImageById($id) {
        $sql = "SELECT Imagen FROM " . $this->table_name . " WHERE Id_producto = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row ? $row['Imagen'] : "default.png";
    }

    // Actualizar producto
    public function update() {

        // Mantener imagen si no envían una nueva
        if (empty($this->Imagen)) {
            $this->Imagen = $this->getImageById($this->Id_producto);
        }

        $query = "UPDATE " . $this->table_name . " 
                  SET Nombre_producto=:Nombre_producto, Precio_producto=:Precio_producto, 
                      Tipo_producto=:Tipo_producto, Descripcion=:Descripcion, Imagen=:Imagen 
                  WHERE Id_producto = :Id_producto";

        $stmt = $this->conn->prepare($query);

        // Sanitizar
        $this->Nombre_producto = htmlspecialchars(strip_tags($this->Nombre_producto));
        $this->Tipo_producto = htmlspecialchars(strip_tags($this->Tipo_producto));
        $this->Descripcion = htmlspecialchars(strip_tags($this->Descripcion));
        $this->Imagen = htmlspecialchars(strip_tags($this->Imagen));

        $stmt->bindParam(":Nombre_producto", $this->Nombre_producto);
        $stmt->bindParam(":Precio_producto", $this->Precio_producto);
        $stmt->bindParam(":Tipo_producto", $this->Tipo_producto);
        $stmt->bindParam(":Descripcion", $this->Descripcion);
        $stmt->bindParam(":Imagen", $this->Imagen);
        $stmt->bindParam(":Id_producto", $this->Id_producto);

        return $stmt->execute();
    }

    // Eliminar producto
    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE Id_producto = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->Id_producto);
        return $stmt->execute();
    }
}
?>
