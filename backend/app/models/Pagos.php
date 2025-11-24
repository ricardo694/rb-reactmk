<?php
class Pagos {
    private $conn;
    private $table_name = "Pagos";

    public $Id_pagos;
    public $Tipo_pago;
    public $Cantidad_pago;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Obtener todos los pagos
    public function readAll() {
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
    // Crear pago
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                 SET Tipo_pago=:Tipo_pago, Cantidad_pago=:Cantidad_pago";
        
        $stmt = $this->conn->prepare($query);
        
        $this->Tipo_pago = htmlspecialchars(strip_tags($this->Tipo_pago));
        
        $stmt->bindParam(":Tipo_pago", $this->Tipo_pago);
        $stmt->bindParam(":Cantidad_pago", $this->Cantidad_pago);
        
        if($stmt->execute()) {
            $this->Id_pagos = $this->conn->lastInsertId();
            return true;
        }
        return false;
    }
}
?>