<?php
class ProductController {
    private $productModel;

    public function __construct($db) {
        $this->productModel = new Product($db);
    }

    // Obtener todos los productos
    public function getAllProducts() {
        $stmt = $this->productModel->readAll();
        $products = [];
        $baseUrl = "http://localhost/reactRB/backend/public/productos/";
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            
            $products[] = [
                "id" => intval($row["Id_producto"]),
                "nombre" => $row["Nombre_producto"],
                "precio" => intval($row["Precio_producto"]),
                "tipo" => $row["Tipo_producto"],
                "descripcion" => $row["Descripcion"],
                "imageUrl" => $baseUrl . $row["Imagen"],
            ];
        }

        http_response_code(200);
        return json_encode(["products" => $products]);
    }

    // Crear producto (solo admin)
    public function createProduct($data, $userRole) {
    if ($userRole !== 'administrador') {
        http_response_code(403);
        return json_encode(["message" => "Acceso denegado. Se requiere rol de administrador."]);
    }

    // Validar datos requeridos
    $required = ['Nombre_producto', 'Precio_producto', 'Tipo_producto'];
    foreach ($required as $field) {
        if (empty($data[$field])) {
            http_response_code(400);
            return json_encode(["message" => "El campo $field es requerido."]);
        }
    }

    // 🔥 Manejo de archivo
    if (!empty($_FILES['imagen']['name'])) {
        $uploadDir = __DIR__ . "/../public/productos/";
        $extension = pathinfo($_FILES['imagen']['name'], PATHINFO_EXTENSION);
        $fileName = time() . "_" . uniqid() . "." . $extension;

        $fullPath = $uploadDir . $fileName;

        if (!move_uploaded_file($_FILES['imagen']['tmp_name'], $fullPath)) {
            http_response_code(500);
            return json_encode(["message" => "Error al subir la imagen."]);
        }

        $data['Imagen'] = $fileName;
    } else {
        $data['Imagen'] = "default.png"; // por si no envían imagen
    }

    // Asignar al modelo
    $this->productModel->Nombre_producto = $data['Nombre_producto'];
    $this->productModel->Precio_producto = $data['Precio_producto'];
    $this->productModel->Tipo_producto = $data['Tipo_producto'];
    $this->productModel->Descripcion = $data['Descripcion'] ?? '';
    $this->productModel->Imagen = $data['Imagen'];

    if ($this->productModel->create()) {
        http_response_code(201);
        return json_encode(["message" => "Producto creado exitosamente."]);
    }

    http_response_code(500);
    return json_encode(["message" => "Error al crear producto."]);
}

}
?>