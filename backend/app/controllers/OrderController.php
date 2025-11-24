<?php
class OrderController {
    private $orderModel;

    public function __construct($db) {
        $this->orderModel = new Order($db);
    }

    // Obtener órdenes del usuario
    public function getUserOrders($userId) {
        $stmt = $this->orderModel->readByUser($userId);
        $orders = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $orders[] = $row;
        }

        http_response_code(200);
        return json_encode(array("orders" => $orders));
    }

    // Obtener todas las órdenes (solo admin)
    public function getAllOrders($userRole) {
        if($userRole !== 'administrador') {
            http_response_code(403);
            return json_encode(array("message" => "Acceso denegado. Se requiere rol de administrador."));
        }

        $stmt = $this->orderModel->readAll();
        $orders = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $orders[] = $row;
        }

        http_response_code(200);
        return json_encode(array("orders" => $orders));
    }
}
?>