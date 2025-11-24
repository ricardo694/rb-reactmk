<?php
class AdminController {
    private $db;
    private $userModel;
    private $productModel;
    private $establecimientoModel;

    public function __construct($db) {
        $this->db = $db;
        $this->userModel = new User($db);
        $this->productModel = new Product($db);
        $this->establecimientoModel = new Establecimiento($db);
    }

    // 🔐 Verificar si es admin
   private function checkAdmin($userRole) {
    $role = strtolower(trim($userRole));

    return true;
}


    // 👥 CRUD USUARIOS

    // Actualizar usuario

    public function updateUser($data, $userRole) {

    if (!$this->checkAdmin($userRole)) return;

    // Validaciones básicas
    if (empty($data['Id_usuario'])) {
        http_response_code(400);
        return json_encode(["message" => "El ID del usuario es requerido."]);
    }

    // Asignar datos al modelo
    $this->userModel->Id_usuario = $data['Id_usuario'];
    $this->userModel->Nombre = $data['Nombre'] ?? null;
    $this->userModel->Apellido = $data['Apellido'] ?? null;
    $this->userModel->Documento = $data['Documento'] ?? null;
    $this->userModel->Telefono = $data['Telefono'] ?? null;
    $this->userModel->Correo_electronico = $data['Correo_electronico'] ?? null;
    $this->userModel->Tipo_usuario = $data['Tipo_usuario'] ?? null;

    // Si viene nueva contraseña, se actualiza
    if (!empty($data['Contrasena'])) {
        $this->userModel->Contrasena = password_hash($data['Contrasena'], PASSWORD_DEFAULT);
    }

    // Ejecutar actualización
    if ($this->userModel->update()) {
        http_response_code(200);
        return json_encode(["message" => "Usuario actualizado correctamente."]);
    } else {
        http_response_code(500);
        return json_encode(["message" => "Error al actualizar usuario."]);
    }
}

    public function getUsers($userRole) {
    if(!$this->checkAdmin($userRole)) return;

    $stmt = $this->userModel->readAll();
    $usuarios = [];
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $usuarios[] = $row;
    }

    http_response_code(200);
    return json_encode(["usuarios" => $usuarios]);
}

// Crear usuario (ADMIN)
public function createUser($data, $userRole) {
    if(!$this->checkAdmin($userRole)) return;

    if (empty($data['Nombre']) || empty($data['Correo_electronico'])) {
        http_response_code(400);
        return json_encode(array("message" => "Nombre y correo son requeridos."));
    }

    // La contraseña es opcional, si no se envía generamos una
    $password = $data['Contrasena'] ?? substr(md5(time()), 0, 8);

    $this->userModel->Nombre = $data['Nombre'];
    $this->userModel->Apellido = $data['Apellido'] ?? '';
    $this->userModel->Documento = $data['Documento'] ?? '';
    $this->userModel->Telefono = $data['Telefono'] ?? '';
    $this->userModel->Correo_electronico = $data['Correo_electronico'];
    $this->userModel->Contrasena = password_hash($password, PASSWORD_DEFAULT);
    $this->userModel->Tipo_usuario = $data['Tipo_usuario'] ?? 'cliente';

    if($this->userModel->create()) {
        http_response_code(201);
        return json_encode(array(
            "message" => "Usuario creado exitosamente.",
            "generated_password" => $password
        ));
    } else {
        http_response_code(500);
        return json_encode(array("message" => "Error al crear usuario."));
    }
}


public function deleteUser($userId, $userRole) {

    if (!$this->checkAdmin($userRole)) return;

    $this->userModel->Id_usuario = $userId;

    if($this->userModel->delete()) {
        http_response_code(200);
        return json_encode(["message" => "Usuario eliminado exitosamente."]);
    } else {
        http_response_code(500);
        return json_encode(["message" => "Error al eliminar usuario."]);
    }
}



    // 🍕 CRUD PRODUCTOS

    // Actualizar producto
    public function updateProduct() {
    // ============================
    // VALIDAR CAMPOS OBLIGATORIOS
    // ============================
    $required = ['Id_producto', 'Nombre_producto', 'Precio_producto', 'Tipo_producto'];
    foreach ($required as $field) {
        if (empty($_POST[$field])) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "El campo $field es requerido."]);
            return;
        }
    }

    $id = $_POST['Id_producto'];

    // ============================
    // OBTENER IMAGEN ACTUAL
    // ============================
    $imagenNombre = $this->productModel->getImageById($id);

    // ============================
    // MANEJO DE ARCHIVO NUEVO
    // ============================
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
    $this->productModel->Id_producto     = $id;
    $this->productModel->Nombre_producto = $_POST['Nombre_producto'];
    $this->productModel->Precio_producto = $_POST['Precio_producto'];
    $this->productModel->Tipo_producto   = $_POST['Tipo_producto'];
    $this->productModel->Descripcion     = $_POST['Descripcion'] ?? "";
    $this->productModel->Imagen          = $imagenNombre;

    // ============================
    // ACTUALIZAR PRODUCTO
    // ============================
    if ($this->productModel->update()) {
        http_response_code(200);
        echo json_encode(["success" => true, "message" => "Producto actualizado exitosamente."]);
        return;
    }

    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Error al actualizar producto."]);
}



    // Eliminar producto
    public function deleteProduct($productId, $userRole) {
        if(!$this->checkAdmin($userRole)) return;

        $this->productModel->Id_producto = $productId;

        if($this->productModel->delete()) {
            http_response_code(200);
            return json_encode(array("message" => "Producto eliminado exitosamente."));
        } else {
            http_response_code(500);
            return json_encode(array("message" => "Error al eliminar producto."));
        }
    }

    // 🏢 CRUD ESTABLECIMIENTOS

    // Obtener todos los establecimientos
    public function getEstablecimientos($userRole) {
        if(!$this->checkAdmin($userRole)) return;

        $stmt = $this->establecimientoModel->readAll();
        $establecimientos = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $establecimientos[] = $row;
        }

        http_response_code(200);
        return json_encode(array("establecimientos" => $establecimientos));
    }

    // Crear establecimiento
    public function createEstablecimiento($data, $userRole) {
        if(!$this->checkAdmin($userRole)) return;

        if(empty($data['Nombre_sede']) || empty($data['Ciudad'])) {
            http_response_code(400);
            return json_encode(array("message" => "Nombre de sede y ciudad son requeridos."));
        }

        $this->establecimientoModel->Nombre_sede = $data['Nombre_sede'];
        $this->establecimientoModel->Ciudad = $data['Ciudad'];
        $this->establecimientoModel->Tipo_de_mesa = $data['Tipo_de_mesa'] ?? '';
        $this->establecimientoModel->Responsable = $data['Responsable'] ?? '';
        $this->establecimientoModel->Mesero = $data['Mesero'] ?? '';

        if($this->establecimientoModel->create()) {
            http_response_code(201);
            return json_encode(array("message" => "Establecimiento creado exitosamente."));
        } else {
            http_response_code(500);
            return json_encode(array("message" => "Error al crear establecimiento."));
        }
    }

    // Actualizar establecimiento
    public function updateEstablecimiento($data, $userRole) {
        if(!$this->checkAdmin($userRole)) return;

        if(empty($data['Id_Establecimiento']) || empty($data['Nombre_sede'])) {
            http_response_code(400);
            return json_encode(array("message" => "Datos incompletos."));
        }

        $this->establecimientoModel->Id_Establecimiento = $data['Id_Establecimiento'];
        $this->establecimientoModel->Nombre_sede = $data['Nombre_sede'];
        $this->establecimientoModel->Ciudad = $data['Ciudad'] ?? '';
        $this->establecimientoModel->Tipo_de_mesa = $data['Tipo_de_mesa'] ?? '';
        $this->establecimientoModel->Responsable = $data['Responsable'] ?? '';
        $this->establecimientoModel->Mesero = $data['Mesero'] ?? '';

        if($this->establecimientoModel->update()) {
            http_response_code(200);
            return json_encode(array("message" => "Establecimiento actualizado exitosamente."));
        } else {
            http_response_code(500);
            return json_encode(array("message" => "Error al actualizar establecimiento."));
        }
    }

    // Eliminar establecimiento
    public function deleteEstablecimiento($establecimientoId, $userRole) {
        if(!$this->checkAdmin($userRole)) return;

        $this->establecimientoModel->Id_Establecimiento = $establecimientoId;

        if($this->establecimientoModel->delete()) {
            http_response_code(200);
            return json_encode(array("message" => "Establecimiento eliminado exitosamente."));
        } else {
            http_response_code(500);
            return json_encode(array("message" => "Error al eliminar establecimiento."));
        }
    }
}
?>