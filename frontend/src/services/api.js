const API_URL = 'http://localhost/reactRB/backend/public/index.php';

const buildUrl = (endpoint) => {
  return `${API_URL}?url=${endpoint}`;
};

// Configuración común para todas las peticiones
const fetchConfig = (method, data = null) => {
  const config = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // ✅ Importante para CORS con cookies
  };
  
  if (data) {
    config.body = JSON.stringify(data);
  }
  
  return config;
};

export const apiService = {
  // ============================================
  // 🔐 AUTENTICACIÓN
  // ============================================
  
  async login(credentials) {
    try {
      console.log('🔐 apiService.login - Intentando login...');
      console.log('📧 Credenciales:', credentials);
      
      const response = await fetch(
        buildUrl('login'), 
        fetchConfig('POST', {
          Correo_electronico: credentials.Correo_electronico,
          Contrasena: credentials.Contrasena
        })
      );
      
      console.log('📨 Status:', response.status, response.statusText);
      
      // ✅ CORRECCIÓN: Parsear el JSON sin importar el status
      const result = await response.json();
      console.log('📦 Respuesta completa:', result);
      
      // ✅ CORRECCIÓN: Retornar siempre el resultado
      // El AuthProvider se encargará de verificar result.success
      return result;
      
    } catch (error) {
      console.error('💥 Error en login:', error);
      return { 
        success: false, 
        message: 'Error de conexión con el servidor' 
      };
    }
  },

  async signup(userData) {
    try {
      console.log('📝 Intentando registro...');
      
      const response = await fetch(
        buildUrl('signup'), 
        fetchConfig('POST', userData)
      );
      
      console.log('📨 Status signup:', response.status);
      
      const result = await response.json();
      console.log('📦 Respuesta signup:', result);
      
      return result;
      
    } catch (error) {
      console.error('💥 Error en signup:', error);
      return { 
        success: false, 
        message: 'Error de conexión con el servidor' 
      };
    }
  },

  // ============================================
  // 🍕 PRODUCTOS
  // ============================================
  
  async getProducts() {
    try {
      const response = await fetch(
        buildUrl('products'), 
        fetchConfig('GET')
      );
      
      const result = await response.json();
      return result;
      
    } catch (error) {
      console.error('Error al obtener productos:', error);
      return { 
        success: false, 
        message: 'Error de conexión con el servidor' 
      };
    }
  },

  // ============================================
  // 👥 USUARIOS
  // ============================================
  
  async getProfile(userId) {
    try {
      const response = await fetch(
        buildUrl(`profile/${userId}`), 
        fetchConfig('GET')
      );
      
      const result = await response.json();
      return result;
      
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      return { 
        success: false, 
        message: 'Error de conexión con el servidor' 
      };
    }
  },

async getAllUsers(userRole) {
  console.log("📡 Cargando usuarios con rol:", userRole);

  const response = await fetch(
    `${API_URL}?url=admin/users&user_role=${userRole}`,
    fetchConfig("GET")
  );

  console.log("📨 Respuesta:", response.status);

  const data = await response.json();
  console.log("📦 Datos recibidos:", data);

  return data;
},



  // ============================================
  // 🛒 CARRITO Y ÓRDENES
  // ============================================
  
  async createOrder(orderData) {
    try {
      console.log('🛒 Creando orden...');
      
      const response = await fetch(
        buildUrl('orders'), 
        fetchConfig('POST', orderData)
      );
      
      const result = await response.json();
      console.log('📦 Resultado orden:', result);
      
      return result;
      
    } catch (error) {
      console.error('Error al crear orden:', error);
      return { 
        success: false, 
        message: 'Error de conexión con el servidor' 
      };
    }
  },

  async getOrderDetails(orderId, userId) {
    try {
      const response = await fetch(
        buildUrl(`orders/${orderId}?user_id=${userId}`), 
        fetchConfig('GET')
      );
      
      const result = await response.json();
      return result;
      
    } catch (error) {
      console.error('Error al obtener detalles de orden:', error);
      return { 
        success: false, 
        message: 'Error de conexión con el servidor' 
      };
    }
  },

async getUserOrders(userId) {
  try {
    const response = await fetch(
      buildUrl(`orders/user/${userId}`),
      fetchConfig('GET')
    );

    const result = await response.json();
    return result.orders || [];

  } catch (error) {
    console.error('Error al obtener órdenes del usuario:', error);
    return [];
  }
},




  // ============================================
  // 👨‍💼 ADMIN - USUARIOS
  // ============================================
  
  async updateUser(userData, userRole) {
    try {
      const response = await fetch(
        buildUrl('admin/users'), 
        fetchConfig('PUT', { ...userData, user_role: userRole })
      );
      
      const result = await response.json();
      return result;
      
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      return { 
        success: false, 
        message: 'Error de conexión con el servidor' 
      };
    }
  },

  async deleteUser(userId, userRole) {
    try {
      const response = await fetch(
        buildUrl(`admin/users/${userId}?user_role=${userRole}`), 
        fetchConfig('DELETE')
      );
      
      const result = await response.json();
      return result;
      
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      return { 
        success: false, 
        message: 'Error de conexión con el servidor' 
      };
    }
  },
async createUser(userData, userRole) {
  try {
    const response = await fetch(
      buildUrl('admin/users'),
      fetchConfig('POST', { ...userData, user_role: userRole })
    );

    return await response.json();

  } catch (error) {
    console.error('Error al crear usuario:', error);
    return { success: false, message: 'Error de conexión con el servidor' };
  }
}
,

  // ============================================
  // 👨‍💼 ADMIN - PRODUCTOS
  // ============================================
  
async createProduct(formData) {
  try {
    const response = await fetch(
      buildUrl("products"),
      {
        method: "POST",
        credentials: "include",
        body: formData, // IMPORTANT: formData directly
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error al crear producto:", error);
    return { success: false, message: "Error de conexión con el servidor" };
  }
},

// Actualizar producto (FormData con _method=PUT)
async updateProduct(formData) {
  try {
    const response = await fetch(
      buildUrl("admin/products"),
      {
        method: "POST", // usamos POST + _method=PUT para evitar problemas con PUT+FormData
        credentials: "include",
        body: formData,
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    return { success: false, message: "Error de conexión con el servidor" };
  }
},

// Eliminar producto (sigue igual)
async deleteProduct(productId, userRole) {
  try {
    const response = await fetch(
      buildUrl(`admin/products/${productId}?user_role=${userRole}`),
      fetchConfig("DELETE")
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    return { success: false, message: "Error de conexión con el servidor" };
  }
},
// ============================================
// 🏢 ADMIN - ESTABLECIMIENTOS
// ============================================
async getEstablecimientos(userRole) {
  try {
    const response = await fetch(`${API_URL}?url=admin/establecimientos&user_role=${userRole}`, fetchConfig('GET'));
    return await response.json();
  } catch (error) {
    console.error("Error al obtener establecimientos:", error);
    return { success: false, establecimientos: [] };
  }
},

async createEstablecimiento(data) {
  try {
    const response = await fetch(buildUrl('admin/establecimientos'), fetchConfig('POST', data));
    return await response.json();
  } catch (error) {
    console.error("Error al crear establecimiento:", error);
    return { success: false };
  }
},

async updateEstablecimiento(data) {
  try {
    const response = await fetch(buildUrl('admin/establecimientos'), fetchConfig('PUT', data));
    return await response.json();
  } catch (error) {
    console.error("Error al actualizar establecimiento:", error);
    return { success: false };
  }
},

async deleteEstablecimiento(id, userRole) {
  try {
    const response = await fetch(`${API_URL}?url=admin/establecimientos/${id}&user_role=${userRole}`, fetchConfig('DELETE'));
    return await response.json();
  } catch (error) {
    console.error("Error al eliminar establecimiento:", error);
    return { success: false };
  }
}
};