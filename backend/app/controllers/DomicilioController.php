<?php

class DomicilioController {

    public function create() {
        $body = json_decode(file_get_contents("php://input"), true);

        $dom = new Domicilio();
        $id = $dom->create($body);

        echo json_encode([
            "success" => true,
            "message" => "Domicilio solicitado",
            "id_domicilio" => $id
        ]);
    }
}
