<?php

class Domicilio {
    private $db;

    public function __construct() {
        $this->db = new Database();
    }

    public function create($data) {
        $query = "INSERT INTO Domicilio (Id_usuario, Id_pedido, Direccion_entrega) VALUES (?, ?, ?)";

        return $this->db->insert($query, [
            $data["Id_usuario"],
            $data["Id_pedido"],
            $data["Direccion_entrega"]
        ]);
    }
}
