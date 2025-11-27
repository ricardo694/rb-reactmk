<?php

class ReservaController {

    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function create($body) {

        $reserva = new Reserva($this->db);
        $id = $reserva->create($body);

        echo json_encode([
            "success" => true,
            "message" => "Reserva creada correctamente",
            "id_reserva" => $id
        ]);
    }
}

