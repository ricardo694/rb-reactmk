const API_URL = 'http://localhost/reactRB/backend/public/index.php';

const buildUrl = (endpoint) => {
  return `${API_URL}?url=${endpoint}`;
};

const fetchConfig = (method, data = null) => {
  const config = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include"
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  return config;
};

export const apiService = {

  // ============================================================
  // 🔐 AUTENTICACIÓN
  // ============================================================

  async login(credentials) {
    try {
      const response = await fetch(
        buildUrl("login"),
        fetchConfig("POST", {
          Correo_electronico: credentials.Correo_electronico,
          Contrasena: credentials.Contrasena,
        })
      );

      const result = await response.json();
      return result;

    } catch (error) {
      console.error("💥 Error en login:", error);
      return { success: false, message: "Error de conexión con el servidor" };
    }
  },

  async signup(userData) {
    try {
      const response = await fetch(
        buildUrl("signup"),
        fetchConfig("POST", userData)
      );

      return await response.json();

    } catch (error) {
      console.error("💥 Error en signup:", error);
      return { success: false, message: "Error de conexión con el servidor" };
    }
  },

  // ============================================================
  // 🍕 PRODUCTOS
  // ============================================================

  async getProducts() {
    try {
      const response = await fetch(buildUrl("products"), fetchConfig("GET"));
      return await response.json();

    } catch (error) {
      console.error("Error al obtener productos:", error);
      return { success: false };
    }
  },

  // ============================================================
  // 👥 USUARIOS
  // ============================================================

  async getProfile(userId) {
    try {
      const response = await fetch(
        buildUrl(`profile/${userId}`),
        fetchConfig("GET")
      );

      return await response.json();

    } catch (error) {
      console.error("Error al obtener perfil:", error);
      return { success: false };
    }
  },

  async getAllUsers(userRole) {
    try {
      const response = await fetch(
        `${API_URL}?url=admin/users&user_role=${userRole}`,
        fetchConfig("GET")
      );

      return await response.json();

    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      return { success: false };
    }
  },

  // ============================================================
  // 🛒 ÓRDENES
  // ============================================================

  async createOrder(orderData) {
    try {
      const response = await fetch(
        buildUrl("orders"),
        fetchConfig("POST", orderData)
      );

      return await response.json();

    } catch (error) {
      console.error("Error al crear orden:", error);
      return { success: false };
    }
  },

  async getOrderDetails(orderId, userId) {
    try {
      const response = await fetch(
        buildUrl(`orders/${orderId}?user_id=${userId}`),
        fetchConfig("GET")
      );

      return await response.json();

    } catch (error) {
      console.error("Error al obtener detalles:", error);
      return { success: false };
    }
  },

async getUserOrders(userId) {
  try {
    const response = await fetch(
      buildUrl(`orders/user/${userId}`),
      fetchConfig("GET")
    );

    const result = await response.json();
    return result.orders || [];
  } catch (error) {
    console.error("Error al obtener pedidos del usuario:", error);
    return [];
  }
},

  // ============================================================
  // 🪑 MESAS
  // ============================================================

  async getMesas(establecimientoId) {
    try {
      const response = await fetch(
        buildUrl(`mesas/${establecimientoId}`),
        fetchConfig("GET")
      );

      return await response.json();

    } catch (error) {
      console.error("❌ Error al obtener mesas:", error);
      return { success: false, mesas: [] };
    }
  },

  // ============================================================
  // 📅 RESERVAS (USUARIO)
  // ============================================================

  async getReservasByUser(userId) {
    try {
      const response = await fetch(
        buildUrl(`reservas/user/${userId}`),
        fetchConfig("GET")
      );

      return await response.json();

    } catch (error) {
      console.error("❌ Error al obtener reservas:", error);
      return { success: false, reservas: [] };
    }
  },

  async cancelReserva(reservaId, userId) {
    try {
      const response = await fetch(
        buildUrl(`reserva/cancel/${reservaId}?user_id=${userId}`),
        fetchConfig("PUT")
      );

      return await response.json();

    } catch (error) {
      console.error("❌ Error al cancelar reserva:", error);
      return { success: false };
    }
  },

  // ============================================================
  // 🚨 **ÚNICO createReservaUser CORRECTO**
  // ============================================================

  async createReservaUser(data) {
    try {
      const response = await fetch(
        buildUrl("reserva"), // ✅ Este es el endpoint correcto
        fetchConfig("POST", data)
      );

      return await response.json();

    } catch (error) {
      console.error("❌ Error al crear reserva:", error);
      return { success: false };
    }
  },

  // ============================================================
  // 👨‍💼 ADMIN - USUARIOS
  // ============================================================

  async updateUser(userData, userRole) {
    try {
      const response = await fetch(
        buildUrl("admin/users"),
        fetchConfig("PUT", { ...userData, user_role: userRole })
      );

      return await response.json();

    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      return { success: false };
    }
  },

  async deleteUser(userId, userRole) {
    try {
      const response = await fetch(
        buildUrl(`admin/users/${userId}?user_role=${userRole}`),
        fetchConfig("DELETE")
      );

      return await response.json();

    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      return { success: false };
    }
  },

  // ============================================================
  // 👨‍💼 ADMIN - PRODUCTOS
  // ============================================================

  async createProduct(formData) {
    try {
      const response = await fetch(buildUrl("products"), {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      return await response.json();

    } catch (error) {
      console.error("Error al crear producto:", error);
      return { success: false };
    }
  },

  async updateProduct(formData) {
    try {
      const response = await fetch(buildUrl("admin/products"), {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      return await response.json();

    } catch (error) {
      console.error("Error al actualizar producto:", error);
      return { success: false };
    }
  },

  async deleteProduct(productId, userRole) {
    try {
      const response = await fetch(
        buildUrl(`admin/products/${productId}?user_role=${userRole}`),
        fetchConfig("DELETE")
      );

      return await response.json();

    } catch (error) {
      console.error("Error al eliminar producto:", error);
      return { success: false };
    }
  },

  // ============================================================
  // 👨‍💼 ADMIN - RESERVAS
  // ============================================================

  async getAllReservas(userRole) {
    try {
      const response = await fetch(
        `${API_URL}?url=admin/reservas&user_role=${userRole}`,
        fetchConfig("GET")
      );

      return await response.json();

    } catch (error) {
      console.error("Error al obtener reservas:", error);
      return { success: false };
    }
  },

  async updateReserva(data) {
    try {
      const response = await fetch(
        buildUrl("admin/reserva"),
        fetchConfig("PUT", data)
      );

      return await response.json();

    } catch (error) {
      console.error("Error al actualizar reserva:", error);
      return { success: false };
    }
  },

  async deleteReserva(reservaId, userRole) {
    try {
      const response = await fetch(
        `${API_URL}?url=admin/reserva/${reservaId}&user_role=${userRole}`,
        fetchConfig("DELETE")
      );

      return await response.json();

    } catch (error) {
      console.error("Error al eliminar reserva:", error);
      return { success: false };
    }
  },

  async createReservaAdmin(data) {
    try {
      const response = await fetch(
        buildUrl("reserva"),
        fetchConfig("POST", data)
      );

      return await response.json();

    } catch (error) {
      console.error("Error al crear reserva admin:", error);
      return { success: false };
    }
  },

  // ============================================================
  // 🏢 ADMIN - ESTABLECIMIENTOS
  // ============================================================

  async getEstablecimientos(userRole) {
    try {
      const response = await fetch(
        `${API_URL}?url=admin/establecimientos&user_role=${userRole}`,
        fetchConfig("GET")
      );

      return await response.json();

    } catch (error) {
      console.error("Error al obtener establecimientos:", error);
      return { success: false };
    }
  },

  async createEstablecimiento(data) {
    try {
      const response = await fetch(
        buildUrl("admin/establecimientos"),
        fetchConfig("POST", data)
      );

      return await response.json();

    } catch (error) {
      console.error("Error al crear establecimiento:", error);
      return { success: false };
    }
  },

  async updateEstablecimiento(data) {
    try {
      const response = await fetch(
        buildUrl("admin/establecimientos"),
        fetchConfig("PUT", data)
      );

      return await response.json();

    } catch (error) {
      console.error("Error al actualizar establecimiento:", error);
      return { success: false };
    }
  },

  async deleteEstablecimiento(id, userRole) {
    try {
      const response = await fetch(
        `${API_URL}?url=admin/establecimientos/${id}&user_role=${userRole}`,
        fetchConfig("DELETE")
      );

      return await response.json();

    } catch (error) {
      console.error("Error al eliminar establecimiento:", error);
      return { success: false };
    }
  },
};
