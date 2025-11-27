import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import Cart from './Cart';

const CartContainer = () => {
  const { user } = useAuth();
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getTotalPrice, 
    getTotalItems,
    createOrder,
    loading 
  } = useCart();
  
  const navigate = useNavigate();

  // Manejar checkout
  const handleCheckout = async (tipoPago) => {
  if (!user) {
    alert('Debes iniciar sesión para realizar una orden');
    navigate('/'); 
    return;
  }

  if (cartItems.length === 0) {
    alert('Tu carrito está vacío');
    return;
  }

const orderData = {
  Id_usuario: user.Id_usuario,
  tipo_pago: tipoPago,
  total: getTotalPrice(),
  productos: cartItems.map(item => ({
    Id_producto: item.Id_producto,
    cantidad: item.cantidad,
    precio: item.Precio_producto
  })),
  domicilio: {
      direccion: user.direccion || null,
      solicitar: tipoPago === "Domicilio"
    }
};

  try {
    const result = await createOrder(orderData);

    if (result.success) {
      alert(`✅ ${result.message}\nCódigo de orden: ${result.orden.codigo_orden}`);
      navigate('/profile');
    } else {
      alert(`❌ ${result.message}`);
    }
  } catch (error) {
    alert('Error al procesar la orden');
    console.error('Checkout error:', error);
  }
};




  return (
    <Cart
      cartItems={cartItems}
      totalPrice={getTotalPrice()}
      totalItems={getTotalItems()}
      user={user}
      loading={loading}
      onUpdateQuantity={updateQuantity}
      onRemoveItem={removeFromCart}
      onClearCart={clearCart}
      onCheckout={handleCheckout}
      onNavigateToMenu={() => navigate('/menu')}
      onNavigateToLogin={() => navigate('/')}
    />
  );
};

export default CartContainer;