<?php
class UserController {
    private $userModel;

    public function __construct($db) {
        $this->userModel = new User($db);
    }

    // Obtener perfil del usuario actual
    public function getProfile($userId) {
        $this->userModel->Id_usuario = $userId;
        $user = $this->userModel->readOne();
        
        if($user) {
            http_response_code(200);
            return json_encode(array("user" => $user));
        } else {
            http_response_code(404);
            return json_encode(array("message" => "Usuario no encontrado."));
        }
    }

    // Obtener todos los usuarios (solo admin)
    public function getAllUsers($currentUserRole) {
        if($currentUserRole !== 'administrador') {
            http_response_code(403);
            return json_encode(array("message" => "Acceso denegado. Se requiere rol de administrador."));
        }

        $stmt = $this->userModel->readAll();
        $users = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $users[] = $row;
        }

        http_response_code(200);
        return json_encode(array("users" => $users));
    }
    public function deleteUser($userId, $userRole) {

    // Normalizar rol (evita errores por mayúsculas o espacios)
    $userRole = strtolower(trim($userRole));

    if ($userRole !== 'administrador') {
        return json_encode([
            "success" => false,
            "message" => "Acceso denegado. Se requiere rol de administrador."
        ]);
    }
    
    if(!$this->checkAdmin($userRole)) return;

    $this->userModel->Id_usuario = $userId;

    if($this->userModel->delete()) {
        http_response_code(200);
        return json_encode(array("message" => "Usuario eliminado exitosamente."));
    } else {
        http_response_code(500);
        return json_encode(array("message" => "Error al eliminar usuario."));
    }
}

}
?>