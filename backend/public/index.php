<?php 
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(E_ALL);

// ============================================
// 🔧 CONFIGURACIÓN CORS
// ============================================
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Accept, Origin");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 3600");

// 🎯 MANEJAR PREFLIGHT (OPTIONS) ANTES DE TODO EL FLUJO
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ============================================
// 📁 INCLUSIÓN DE ARCHIVOS NECESARIOS
// ============================================
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
include_once '../app/models/Mesa.php';
include_once '../app/controllers/MesaController.php';
include_once '../app/models/Reserva.php';
include_once '../app/controllers/ReservaController.php';

// ============================================
// 🔄 MÉTODO HTTP Y DATA
// ============================================
$method = $_SERVER['REQUEST_METHOD']; 
$endpoint = $_GET['url'] ?? '';
$input = json_decode(file_get_contents("php://input"), true);

// permitir override solo desde form-data
if ($method === 'POST' && isset($_POST['_method'])) {
    $method = strtoupper($_POST['_method']);
}

// 👇 Fix para PUT y DELETE (php://input puede venir vacío)
if (($method === 'PUT' || $method === 'DELETE') && empty($input)) {
    $rawData = file_get_contents("php://input");
    $input = json_decode($rawData, true);
    if (!$input) {
        parse_str($rawData, $parsed);
        $input = $parsed;
    }
}

ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(E_ALL);

// ============================================
// 🗄️ BASE DE DATOS
// ============================================
$database = new Database();
$db = $database->getConnection();

// ============================================
// 🎮 CONTROLADORES
// ============================================
$authController = new AuthController($db);
$userController = new UserController($db);
$productController = new ProductController($db);
$orderController = new OrderController($db);
$adminController = new AdminController($db);
$cartController = new CartController($db);
$reservaController = new ReservaController($db);

// ============================================
// 🚦 ROUTER PRINCIPAL
// ============================================
switch (true) {

    // ============================================
    // 🔐 AUTENTICACIÓN
    // ============================================
    case $method === 'POST' && $endpoint === 'signup':
        echo $authController->signup($input);
        break;

    case $method === 'POST' && $endpoint === 'login':
        echo $authController->login($input);
        break;

    // ============================================
    // 👥 USUARIOS
    // ============================================
    case $method === 'GET' && $endpoint === 'users':
        echo $userController->getAllUsers($_GET['user_role'] ?? 'cliente');
        break;

    case $method === 'GET' && strpos($endpoint, 'profile/') === 0:
        echo $userController->getProfile(str_replace('profile/', '', $endpoint));
        break;

    // ============================================
    // 🍕 PRODUCTOS
    // ============================================
    case $method === 'GET' && $endpoint === 'products':
        echo $productController->getAllProducts();
        break;

    case $method === 'POST' && $endpoint === 'products':
        echo $productController->createProduct($input, $input['user_role'] ?? 'cliente');
        break;

    // ============================================
    // 📋 ÓRDENES
    // ============================================
    case $method === 'GET' && strpos($endpoint, 'orders/user/') === 0:
    echo $orderController->getUserOrders(str_replace('orders/user/', '', $endpoint));
    break;


    case $method === 'GET' && $endpoint === 'orders':
        echo $orderController->getAllOrders($_GET['user_role'] ?? 'cliente');
        break;

    case $method === 'POST' && $endpoint === 'orders':
        echo $cartController->createOrder($input);
        break;

    case $method === 'GET' && strpos($endpoint, 'orders/') === 0:
        echo $cartController->getOrderDetails(
            str_replace('orders/', '', $endpoint),
            $_GET['user_id'] ?? 0
        );
        break;

    // ============================================
    // 👨‍💼 ADMIN - USUARIOS
    // ============================================
    case $method === 'POST' && $endpoint === 'admin/users':
        echo $adminController->createUser($input, $input['user_role'] ?? 'cliente');
        break;

    case $method === 'GET' && $endpoint === 'admin/users':
        echo $adminController->getUsers($_GET['user_role'] ?? 'cliente');
        break;

    case $method === 'PUT' && $endpoint === 'admin/users':
        echo $adminController->updateUser($input, $input['user_role'] ?? 'cliente');
        break;

    case $method === 'DELETE' && strpos($endpoint, 'admin/users/') === 0:
        echo $adminController->deleteUser(
            str_replace('admin/users/', '', $endpoint),
            $_GET['user_role'] ?? 'cliente'
        );
        break;

    // ============================================
    // 👨‍💼 ADMIN - PRODUCTOS
    // ============================================
    case $method === 'POST' && $endpoint === 'products':
        echo $productController->createProduct();
        break;

    case $method === 'PUT' && $endpoint === 'admin/products':
        $input = array_merge($_POST, $input ?? []);
        echo $adminController->updateProduct($input, $input['user_role'] ?? 'cliente');
        break;

    case $method === 'DELETE' && strpos($endpoint, 'admin/products/') === 0:
        echo $adminController->deleteProduct(
            str_replace('admin/products/', '', $endpoint),
            $_GET['user_role'] ?? 'cliente'
        );
        break;

    // ============================================
    // 👨‍💼 ADMIN - ESTABLECIMIENTOS
    // ============================================
    case $method === 'GET' && $endpoint === 'admin/establecimientos':
        echo $adminController->getEstablecimientos($_GET['user_role'] ?? 'cliente');
        break;

    case $method === 'POST' && $endpoint === 'admin/establecimientos':
        echo $adminController->createEstablecimiento($input, $input['user_role'] ?? 'cliente');
        break;

    case $method === 'PUT' && $endpoint === 'admin/establecimientos':
        echo $adminController->updateEstablecimiento($input, $input['user_role'] ?? 'cliente');
        break;

    case $method === 'DELETE' && strpos($endpoint, 'admin/establecimientos/') === 0:
        echo $adminController->deleteEstablecimiento(
            str_replace('admin/establecimientos/', '', $endpoint),
            $_GET['user_role'] ?? 'cliente'
        );
        break;

    // ============================================
    // 📊 ADMIN - DASHBOARD
    // ============================================
    case $method === 'GET' && $endpoint === 'admin/dashboard':
        echo $adminController->getDashboard($_GET['user_role'] ?? 'cliente');
        break;

    // ============================================
    // 🍽 MESAS
    // ============================================
    case $method === 'GET' && strpos($endpoint, 'mesas/') === 0:
        $id = str_replace('mesas/', '', $endpoint);
        $mesa = new MesasController($db);
        echo $mesa->getMesas($id);
        break;

    // ============================================
    // 🍽 RESERVAS
    // ============================================

case $method === 'POST' && ($endpoint === 'reserva' || $endpoint === 'reserva/create'):
    echo $reservaController->create($input);
    break;

    // ============================================
// 🍽 RESERVAS - USUARIO
// ============================================
case $method === 'GET' && strpos($endpoint, 'reservas/user/') === 0:
    $userId = str_replace('reservas/user/', '', $endpoint);
    echo $reservaController->getReservasByUser($userId);
    break;
    // ============================================
    // ❌ ENDPOINT NO ENCONTRADO
    // ============================================
    default:
        http_response_code(404);
        echo json_encode(["message" => "Endpoint no encontrado."]);
        break;
}
