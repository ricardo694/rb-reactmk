<?php

class ReservaController {

    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

        // Obtener reservas de un usuario
    public function getReservasByUser($userId) {
        try {
            $reserva = new Reserva($this->db);
            $data = $reserva->getByUserId($userId);

            return json_encode([
                "success" => true,
                "reservas" => $data
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            return json_encode([
                "success" => false,
                "message" => "Error al obtener reservas: " . $e->getMessage()
            ]);
        }
    }


    public function create($body) {

        $reserva = new Reserva($this->db);
        $id = $reserva->create($body);

        return json_encode([
            "success" => true,
            "message" => "Reserva creada correctamente",
            "id_reserva" => $id
        ]);
    }
}
?>
