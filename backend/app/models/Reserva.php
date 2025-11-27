<?php

class Reserva {

    private $conn;
    private $table = "Reserva";   // ← CORREGIDO

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create($data) {

        // Validar campos obligatorios
        $required = ["Id_usuario", "Id_establecimiento", "Id_mesa", "Fecha_reserva", "Hora_reserva", "Numero_personas"];

        foreach ($required as $r) {
            if (!isset($data[$r])) {
                throw new Exception("Falta el campo: $r");
            }
        }

        $query = "INSERT INTO {$this->table}
                  (Id_usuario, Id_establecimiento, Id_mesa, Fecha_reserva, Hora_reserva, Numero_personas)
                  VALUES 
                  (:Id_usuario, :Id_establecimiento, :Id_mesa, :Fecha_reserva, :Hora_reserva, :Numero_personas)";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":Id_usuario", $data["Id_usuario"]);
        $stmt->bindParam(":Id_establecimiento", $data["Id_establecimiento"]);
        $stmt->bindParam(":Id_mesa", $data["Id_mesa"]);
        $stmt->bindParam(":Fecha_reserva", $data["Fecha_reserva"]);
        $stmt->bindParam(":Hora_reserva", $data["Hora_reserva"]);
        $stmt->bindParam(":Numero_personas", $data["Numero_personas"]);

        if (!$stmt->execute()) {
            throw new Exception("Error al insertar reserva: " . implode(" | ", $stmt->errorInfo()));
        }

        return $this->conn->lastInsertId();
    }

public function getByUserId($userId) {
    $stmt = $this->conn->prepare("SELECT * FROM Reserva WHERE Id_usuario = :id_usuario");
    $stmt->bindParam(':id_usuario', $userId, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

}
