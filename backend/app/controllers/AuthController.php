<?php
class AuthController {
    private $userModel;

    public function __construct($db) {
        $this->userModel = new User($db);
    }

    // 📝 SIGNUP - Registro de usuario
    public function signup($data) {
        // Validar datos requeridos
        $required = ['Nombre', 'Apellido', 'Documento', 'Telefono', 'Correo_electronico', 'Contrasena'];
        foreach($required as $field) {
            if(empty($data[$field])) {
                http_response_code(400);
                return json_encode(array(
                    "success" => false,
                    "message" => "El campo $field es requerido."
                ));
            }
        }

        // Validar formato email
        if(!filter_var($data['Correo_electronico'], FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            return json_encode(array(
                "success" => false,
                "message" => "Formato de email inválido."
            ));
        }

        // Verificar si email ya existe
        $this->userModel->Correo_electronico = $data['Correo_electronico'];
        if($this->userModel->emailExists()) {
            http_response_code(400);
            return json_encode(array(
                "success" => false,
                "message" => "El email ya está registrado."
            ));
        }

        // Asignar datos al modelo
        $this->userModel->Nombre = $data['Nombre'];
        $this->userModel->Apellido = $data['Apellido'];
        $this->userModel->Documento = $data['Documento'];
        $this->userModel->Telefono = $data['Telefono'];
        $this->userModel->Correo_electronico = $data['Correo_electronico'];
        $this->userModel->Contrasena = $data['Contrasena'];
        $this->userModel->Tipo_usuario = 'cliente'; // Por defecto es cliente

        // Crear usuario
        if($this->userModel->create()) {
            http_response_code(201);
            return json_encode(array(
                "success" => true,
                "message" => "Usuario registrado exitosamente.",
                "user" => array(
                    "Id_usuario" => $this->userModel->Id_usuario,
                    "Nombre" => $this->userModel->Nombre,
                    "Apellido" => $this->userModel->Apellido,
                    "Documento" => $this->userModel->Documento,
                    "Telefono" => $this->userModel->Telefono,
                    "Correo_electronico" => $this->userModel->Correo_electronico,
                    "Tipo_usuario" => $this->userModel->Tipo_usuario
                )
            ));
        } else {
            http_response_code(500);
            return json_encode(array(
                "success" => false,
                "message" => "Error al registrar usuario."
            ));
        }
    }

    // 🔐 LOGIN - Inicio de sesión
    public function login($data) {
        // Log para debug (QUITAR EN PRODUCCIÓN)
        error_log("=== INICIO LOGIN ===");
        error_log("Email recibido: " . ($data['Correo_electronico'] ?? 'NO ENVIADO'));
        error_log("Password recibido: " . (isset($data['Contrasena']) ? 'SI' : 'NO'));

        // Validar datos requeridos
        if(empty($data['Correo_electronico']) || empty($data['Contrasena'])) {
            error_log("ERROR: Datos incompletos");
            http_response_code(400);
            return json_encode(array(
                "success" => false,
                "message" => "Email y contraseña son requeridos."
            ));
        }

        // Validar formato de email
        if(!filter_var($data['Correo_electronico'], FILTER_VALIDATE_EMAIL)) {
            error_log("ERROR: Email inválido - " . $data['Correo_electronico']);
            http_response_code(400);
            return json_encode(array(
                "success" => false,
                "message" => "Formato de email inválido."
            ));
        }

        // Asignar datos al modelo
        $this->userModel->Correo_electronico = $data['Correo_electronico'];
        $this->userModel->Contrasena = $data['Contrasena'];

        // Intentar login
        error_log("Intentando login para: " . $data['Correo_electronico']);
        
        if($this->userModel->login()) {
            error_log("✅ LOGIN EXITOSO para: " . $data['Correo_electronico']);
            
            http_response_code(200);
            return json_encode(array(
                "success" => true,
                "message" => "Login exitoso.",
                "user" => array(
                    "Id_usuario" => $this->userModel->Id_usuario,
                    "Nombre" => $this->userModel->Nombre,
                    "Apellido" => $this->userModel->Apellido,
                    "Documento" => $this->userModel->Documento,
                    "Telefono" => $this->userModel->Telefono,
                    "Correo_electronico" => $this->userModel->Correo_electronico,
                    "Tipo_usuario" => $this->userModel->Tipo_usuario
                )
            ));
        } else {
            error_log("❌ LOGIN FALLIDO para: " . $data['Correo_electronico']);
            
            http_response_code(401);
            return json_encode(array(
                "success" => false,
                "message" => "Email o contraseña incorrectos."
            ));
        }
    }
}
?>