<?php

class MesasController {

    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function getMesas($id) {

        $mesa = new Mesa($this->db);
        $data = $mesa->getMesasByEstablecimiento($id);

        return json_encode([
            "success" => true,
            "mesas" => $data
        ]);
    }
}
