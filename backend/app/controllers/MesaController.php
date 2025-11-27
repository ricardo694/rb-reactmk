<?php

class MesaController {

    public function getMesas($id) {
        $mesa = new Mesa();
        $data = $mesa->getMesasByEstablecimiento($id);

        echo json_encode([
            "success" => true,
            "mesas" => $data
        ]);
    }
}
