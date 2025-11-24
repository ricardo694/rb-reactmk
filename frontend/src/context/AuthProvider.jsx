import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { apiService } from '../services/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error al parsear usuario:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // 📝 REGISTRO
  const signup = async (userData) => {
    try {
      console.log('📝 Iniciando registro...');
      const response = await apiService.signup(userData);
      console.log('📦 Respuesta signup:', response);
      
      if (response.success && response.user) {
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
        return { success: true, message: response.message, user: response.user };
      } else {
        return { success: false, message: response.message || 'Error al registrar' };
      }
    } catch (error) {
      console.error('❌ Error en signup:', error);
      return { success: false, message: 'Error de conexión con el servidor' };
    }
  };

  // 🔐 LOGIN
  const login = async (email, password) => {
    try {
      console.log('🔐 Iniciando login desde AuthProvider...');
      console.log('📧 Email:', email);
      console.log('🔑 Password length:', password.length);

      // ✅ CORRECCIÓN: Enviar con los nombres correctos que espera el backend
      const response = await apiService.login({
        Correo_electronico: email,  // ⚠️ Backend espera "Correo_electronico"
        Contrasena: password         // ⚠️ Backend espera "Contrasena"
      });

      console.log('📦 Respuesta login completa:', response);

      // Verificar si el login fue exitoso
      if (response.success && response.user) {
        console.log('✅ Login exitoso, guardando usuario:', response.user);
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
        return { 
          success: true, 
          message: response.message, 
          user: response.user 
        };
      } else {
        console.log('❌ Login fallido:', response.message);
        return { 
          success: false, 
          message: response.message || 'Credenciales incorrectas' 
        };
      }
    } catch (error) {
      console.error('💥 Error en login:', error);
      return { 
        success: false, 
        message: 'Error de conexión con el servidor' 
      };
    }
  };

  // 🚪 LOGOUT
  const logout = () => {
    console.log('🚪 Cerrando sesión...');
    setUser(null);
    localStorage.removeItem('user');
  };

  // 🔍 Verificar si es admin
  const isAdmin = () => {
    return user?.Tipo_usuario === 'administrador';
  };

  const value = {
    user,
    signup,
    login,
    logout,
    isAdmin,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};