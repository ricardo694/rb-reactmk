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

    if ($role !== 'administrador') {
        http_response_code(403);
        echo json_encode([
            "success" => false,
            "message" => "Acceso denegado. Se requiere rol de administrador."
        ]);
        return false;
    }
    return true;
}


    // 👥 CRUD USUARIOS

    // Actualizar usuario
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
    public function updateProduct($data, $userRole) {
        if(!$this->checkAdmin($userRole)) return;

        if(empty($data['Id_producto']) || empty($data['Nombre_producto']) || empty($data['Precio_producto'])) {
            http_response_code(400);
            return json_encode(array("message" => "Datos incompletos."));
        }

        $this->productModel->Id_producto = $data['Id_producto'];
        $this->productModel->Nombre_producto = $data['Nombre_producto'];
        $this->productModel->Precio_producto = $data['Precio_producto'];
        $this->productModel->Tipo_producto = $data['Tipo_producto'] ?? '';
        $this->productModel->Descripcion = $data['Descripcion'] ?? '';
        $this->productModel->Imagen = $data['Imagen'] ?? '';

        if($this->productModel->update()) {
            http_response_code(200);
            return json_encode(array("message" => "Producto actualizado exitosamente."));
        } else {
            http_response_code(500);
            return json_encode(array("message" => "Error al actualizar producto."));
        }
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