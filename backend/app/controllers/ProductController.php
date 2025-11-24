<?php
class ProductController {
    private $productModel;

    public function __construct($db) {
        $this->productModel = new Product($db);
    }

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
    // 🔥 ESTA ES LA LÍNEA CORRECTA
    echo json_encode(["products" => $products]);
}

    // Crear producto (solo admin)

public function createProduct() {
    // ============================
    // VALIDAR CAMPOS OBLIGATORIOS
    // ============================
    $required = ['Nombre_producto', 'Precio_producto', 'Tipo_producto'];
    foreach ($required as $field) {
        if (empty($_POST[$field])) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "El campo $field es requerido."]);
            return;
        }
    }

    // ============================
    // MANEJO DE ARCHIVO (IMAGEN)
    // ============================
    $imagenNombre = "default.png";
    if (!empty($_FILES['imagen']) && $_FILES['imagen']['error'] === 0) {
        $uploadDir = dirname(__DIR__, 2) . '/public/productos/'; // apunta a backend/public/productos/
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $ext = pathinfo($_FILES['imagen']['name'], PATHINFO_EXTENSION);
        $imagenNombre = time() . "_" . uniqid() . "." . $ext;
        $destino = $uploadDir . $imagenNombre;

        if (!move_uploaded_file($_FILES['imagen']['tmp_name'], $destino)) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Error al subir la imagen."]);
            return;
        }
    }

    // ============================
    // CARGAR DATOS AL MODELO
    // ============================
    $this->productModel->Nombre_producto = $_POST['Nombre_producto'];
    $this->productModel->Precio_producto = $_POST['Precio_producto'];
    $this->productModel->Tipo_producto   = $_POST['Tipo_producto'];
    $this->productModel->Descripcion     = $_POST['Descripcion'] ?? "";
    $this->productModel->Imagen          = $imagenNombre;

    // ============================
    // CREAR PRODUCTO
    // ============================
    if ($this->productModel->create()) {
        http_response_code(201);
        echo json_encode(["success" => true, "message" => "Producto creado exitosamente."]);
        return;
    }

    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Error al crear producto."]);
}


}
?>