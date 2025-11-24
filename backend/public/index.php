<?php
// 🔧 CONFIGURACIÓN COMPLETA DE CORS - SOLO PHP
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Accept, Origin");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 3600");

// 🎯 MANEJAR PREFLIGHT REQUESTS (OPTIONS) - SIN .htaccess
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Respuesta exitosa para preflight
    http_response_code(200);
    exit();
}

// 📁 INCLUSIÓN DE ARCHIVOS NECESARIOS
include_once '../app/config/config.php';
include_once '../app/models/Database.php';
include_once '../app/models/User.php';
include_once '../app/models/Product.php';
include_once '../app/models/Order.php';
include_once '../app/models/Establecimiento.php';
include_once '../app/models/Pagos.php';
include_once '../app/controllers/AuthController.php';
include_once '../app/controllers/UserController.php';
include_once '../app/controllers/ProductController.php';
include_once '../app/controllers/OrderController.php';
include_once '../app/controllers/AdminController.php';
include_once '../app/controllers/CartController.php';
// permitir method override desde form-data
$method = $_SERVER['REQUEST_METHOD'];
// Si llegó via POST y hay un campo _method, usarlo
if ($method === 'POST' && isset($_POST['_method'])) {
    $method = strtoupper($_POST['_method']); // e.g. PUT
}

// 🎯 OBTENER DATOS DE LA PETICIÓN
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);
$endpoint = $_GET['url'] ?? '';

// 🗄️ CONEXIÓN A LA BASE DE DATOS
$database = new Database();
$db = $database->getConnection();

// 🎮 INSTANCIAR CONTROLADORES
$authController = new AuthController($db);
$userController = new UserController($db);
$productController = new ProductController($db);
$orderController = new OrderController($db);
$adminController = new AdminController($db);
// Instanciar controlador del carrito
$cartController = new CartController($db);


// 🚦 SISTEMA DE RUTEO
switch(true) {
    // ============================================
    // 🔐 AUTENTICACIÓN
    // ============================================
    case $method == 'POST' && $endpoint == 'signup':
        echo $authController->signup($input);
        break;
        
    case $method == 'POST' && $endpoint == 'login':
        echo $authController->login($input);
        break;
        
    // ============================================
    // 👥 USUARIOS
    // ============================================
    case $method == 'GET' && $endpoint == 'users':
        $userRole = $_GET['user_role'] ?? 'cliente';
        echo $userController->getAllUsers($userRole);
        break;
        
    case $method == 'GET' && strpos($endpoint, 'profile/') === 0:
        $userId = str_replace('profile/', '', $endpoint);
        echo $userController->getProfile($userId);
        break;
        
    // ============================================
    // 🍕 PRODUCTOS
    // ============================================
    case $method == 'GET' && $endpoint == 'products':
        echo $productController->getAllProducts();
        break;
        
    case $method == 'POST' && $endpoint == 'products':
        $userRole = $input['user_role'] ?? 'cliente';
        echo $productController->createProduct($input, $userRole);
        break;
        
    // ============================================
    // 📋 ÓRDENES
    // ============================================
    case $method == 'GET' && strpos($endpoint, 'orders/user/') === 0:
        $userId = str_replace('orders/user/', '', $endpoint);
        echo $orderController->getUserOrders($userId);
        break;
        
    case $method == 'GET' && $endpoint == 'orders':
        $userRole = $_GET['user_role'] ?? 'cliente';
        echo $orderController->getAllOrders($userRole);
        break;


    case $method == 'POST' && $endpoint == 'orders':
        echo $cartController->createOrder($input);
        break;

    case $method == 'GET' && strpos($endpoint, 'orders/') === 0:
        $orderId = str_replace('orders/', '', $endpoint);
        $userId = $_GET['user_id'] ?? 0;
        echo $cartController->getOrderDetails($orderId, $userId);
        break;
        
    // ============================================
    // 👨‍💼 ADMIN - USUARIOS
    // ============================================

    case $method == 'POST' && $endpoint == 'admin/users':
    $userRole = $input['user_role'] ?? 'cliente';
    echo $adminController->createUser($input, $userRole);
    break;


    case $method == 'GET' && $endpoint == 'admin/users':
    $userRole = $_GET['user_role'] ?? 'cliente';
    echo $adminController->getUsers($userRole);
        break;

    case $method == 'PUT' && $endpoint == 'admin/users':
        $userRole = $input['user_role'] ?? 'cliente';
        echo $adminController->updateUser($input, $userRole);
        break;
        
    case $method == 'DELETE' && strpos($endpoint, 'admin/users/') === 0:
        $userId = str_replace('admin/users/', '', $endpoint);
        $userRole = $input['user_role'] ?? $_GET['user_role'] ?? 'cliente';
        echo $adminController->deleteUser($userId, $userRole);
        break;


        
    // ============================================
    // 👨‍💼 ADMIN - PRODUCTOS
    // ============================================
    case $method == 'PUT' && $endpoint == 'admin/products':
        $userRole = $input['user_role'] ?? 'cliente';
        echo $adminController->updateProduct($input, $userRole);
        break;
        
    case $method == 'DELETE' && strpos($endpoint, 'admin/products/') === 0:
        $productId = str_replace('admin/products/', '', $endpoint);
        $userRole = $_GET['user_role'] ?? 'cliente';
        echo $adminController->deleteProduct($productId, $userRole);
        break;
        
    // ============================================
    // 👨‍💼 ADMIN - ESTABLECIMIENTOS
    // ============================================
    case $method == 'GET' && $endpoint == 'admin/establecimientos':
        $userRole = $_GET['user_role'] ?? 'cliente';
        echo $adminController->getEstablecimientos($userRole);
        break;
        
    case $method == 'POST' && $endpoint == 'admin/establecimientos':
        $userRole = $input['user_role'] ?? 'cliente';
        echo $adminController->createEstablecimiento($input, $userRole);
        break;
        
    case $method == 'PUT' && $endpoint == 'admin/establecimientos':
        $userRole = $input['user_role'] ?? 'cliente';
        echo $adminController->updateEstablecimiento($input, $userRole);
        break;
        
    case $method == 'DELETE' && strpos($endpoint, 'admin/establecimientos/') === 0:
        $establecimientoId = str_replace('admin/establecimientos/', '', $endpoint);
        $userRole = $_GET['user_role'] ?? 'cliente';
        echo $adminController->deleteEstablecimiento($establecimientoId, $userRole);
        break;
        
    // ============================================
    // 👨‍💼 ADMIN - DASHBOARD
    // ============================================
    case $method == 'GET' && $endpoint == 'admin/dashboard':
        $userRole = $_GET['user_role'] ?? 'cliente';
        echo $adminController->getDashboard($userRole);
        break;
        
    // ============================================
    // ❌ ENDPOINT NO ENCONTRADO
    // ============================================
    default:
        http_response_code(404);
        echo json_encode(array("message" => "Endpoint no encontrado."));
        break;
        
}
?>