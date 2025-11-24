<?php
class CartController {
    private $db;
    private $orderModel;
    private $pagosModel;

    public function __construct($db) {
        $this->db = $db;
        $this->orderModel = new Order($db);
        $this->pagosModel = new Pagos($db);
    }

    // Crear orden completa
    public function createOrder($data) {
        // Validar datos requeridos
        if(empty($data['Id_usuario']) || empty($data['productos']) || !is_array($data['productos'])) {
            http_response_code(400);
            return json_encode(array("message" => "Datos incompletos para crear la orden."));
        }

        try {
            // Iniciar transacción
            $this->db->beginTransaction();

            // 1. Crear el pago
            $this->pagosModel->Tipo_pago = $data['tipo_pago'] ?? 'Efectivo';
            $this->pagosModel->Cantidad_pago = $data['total'] ?? 0;
            
            if(!$this->pagosModel->create()) {
                throw new Exception("Error al crear el pago.");
            }

            // 2. Crear la orden
            $this->orderModel->Id_usuario = $data['Id_usuario'];
            $this->orderModel->Id_pagos = $this->pagosModel->Id_pagos;
            
            if(!$this->orderModel->create()) {
                throw new Exception("Error al crear la orden.");
            }

            // 3. Agregar productos a la orden
            foreach($data['productos'] as $producto) {
                if(!$this->orderModel->addProduct($producto['Id_producto'], $producto['cantidad'] ?? 1)) {
                    throw new Exception("Error al agregar productos a la orden.");
                }
            }

            // Confirmar transacción
            $this->db->commit();

            http_response_code(201);
            return json_encode(array(
                "message" => "Orden creada exitosamente.",
                "orden_id" => $this->orderModel->Id_orden,
                "codigo_orden" => $this->orderModel->Codigo_orden
            ));

        } catch (Exception $e) {
            // Revertir transacción en caso de error
            $this->db->rollBack();
            
            http_response_code(500);
            return json_encode(array("message" => $e->getMessage()));
        }
    }

    // Obtener detalles de una orden específica
    public function getOrderDetails($orderId, $userId) {
        $this->orderModel->Id_orden = $orderId;
        
        // Verificar que la orden pertenezca al usuario
        $orden = $this->orderModel->readOne();
        if(!$orden || $orden['Id_usuario'] != $userId) {
            http_response_code(404);
            return json_encode(array("message" => "Orden no encontrada."));
        }

        // Obtener productos de la orden
        $stmt = $this->orderModel->getOrderProducts();
        $productos = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $productos[] = $row;
        }

        http_response_code(200);
        return json_encode(array(
            "orden" => $orden,
            "productos" => $productos
        ));
    }
}
?>