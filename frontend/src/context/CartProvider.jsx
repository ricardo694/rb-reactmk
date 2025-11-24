import React, { useState, useEffect } from 'react';
import { CartContext } from './CartContext';
import { apiService } from '../services/api';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('restaurante_cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('restaurante_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Agregar producto al carrito
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.Id_producto === product.Id_producto);
      
      if (existingItem) {
        // Si ya existe, aumentar cantidad
        return prevItems.map(item =>
          item.Id_producto === product.Id_producto
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        // Si no existe, agregar nuevo item
        return [...prevItems, { ...product, cantidad: 1 }];
      }
    });
  };

  // Remover producto del carrito
  const removeFromCart = (productId) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item.Id_producto !== productId)
    );
  };

  // Actualizar cantidad de un producto
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.Id_producto === productId
          ? { ...item, cantidad: newQuantity }
          : item
      )
    );
  };

  // Limpiar carrito
  const clearCart = () => {
    setCartItems([]);
  };

  // Calcular total
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.Precio_producto * item.cantidad);
    }, 0);
  };

  // Calcular total de items
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.cantidad, 0);
  };

  // Crear orden
 const createOrder = async (orderData) => {
  setLoading(true);
  try {
    const response = await apiService.createOrder(orderData);

    if (response.orden_id) {
      clearCart();
      return { success: true, message: response.message, orden: response };
    } else {
      return { success: false, message: response.message };
    }
  } catch (error) {
    console.error('Error creando orden:', error);
    return { success: false, message: 'Error al crear la orden' };
  } finally {
    setLoading(false);
  }
};


  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
    createOrder,
    loading
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};