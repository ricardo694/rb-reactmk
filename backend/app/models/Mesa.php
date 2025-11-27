<?php

class Mesa {
    private $db;

    public function __construct() {
        $this->db = (new Database())->getConnection();
    }

    public function getMesasByEstablecimiento($id) {
    $stmt = $this->db->prepare("SELECT * FROM Mesa WHERE Id_establecimiento = ?");
    $stmt->execute([$id]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
}
