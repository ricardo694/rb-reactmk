<?php

class Reserva {
private $db;

public function __construct($db) {
    $this->db = $db;
}


    public function create($data) {
        $query = "INSERT INTO Reserva 
            (Id_usuario, Id_establecimiento, Id_mesa, Fecha_reserva, Hora_reserva, Numero_personas) 
            VALUES (?, ?, ?, ?, ?, ?)";

        return $this->db->insert($query, [
            $data["Id_usuario"],
            $data["Id_establecimiento"],
            $data["Id_mesa"],
            $data["Fecha_reserva"],
            $data["Hora_reserva"],
            $data["Numero_personas"]
        ]);
    }
}
