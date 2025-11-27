import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Undo2, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import './Cart.css';

const Cart = ({ 
  cartItems = [],
  totalPrice = 0,
  totalItems = 0,
  user = null,
  loading = false,
  onUpdateQuantity = () => {},
  onRemoveItem = () => {},
  onClearCart = () => {},
  onCheckout = () => {},
  onNavigateToMenu = () => {},
  onNavigateToLogin = () => {}
}) => {
  const [selectedPayment, setSelectedPayment] = useState('Efectivo');

  // Si el carrito está vacío
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <Link to="/menu" className="return-buton">
            <Undo2 size={16} /> Inicio
          </Link>

          <div className="empty-cart">
            <ShoppingCart size={64} className="empty-cart-icon" />
            <h2>Tu carrito está vacío</h2>
            <p>¡Descubre nuestros deliciosos productos!</p>
            <button 
              onClick={onNavigateToMenu} 
              className="browse-menu-btn"
            >
              Ver Menú
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <Link to="/menu" className="return-buton">
          <Undo2 size={16} /> Inicio
        </Link>

        <h2 className="cart-title">Tu Carrito de Compras</h2>

        <div className="cart-content">
          {/* Lista de productos */}
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.Id_producto} className="cart-item">
                <div className="item-info">
                  <h4 className="item-name">{item.Nombre_producto}</h4>
                  <p className="item-price">${item.Precio_producto?.toLocaleString()} c/u</p>
                </div>

                <div className="item-controls">
                  <div className="quantity-controls">
                    <button 
                      onClick={() => onUpdateQuantity(item.Id_producto, item.cantidad - 1)}
                      className="quantity-btn"
                    >
                      <Minus size={16} />
                    </button>
                    
                    <span className="quantity-display">{item.cantidad}</span>
                    
                    <button 
                      onClick={() => onUpdateQuantity(item.Id_producto, item.cantidad + 1)}
                      className="quantity-btn"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="item-total">
                    ${(item.Precio_producto * item.cantidad)?.toLocaleString()}
                  </div>

                  <button 
                    onClick={() => onRemoveItem(item.Id_producto)}
                    className="remove-btn"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen del pedido */}
          <div className="cart-summary">
            <h3>Resumen del Pedido</h3>
            
            <div className="summary-details">
              <div className="summary-row">
                <span>Productos ({totalItems})</span>
                <span>${Number(totalPrice).toLocaleString()}</span>
              </div>
              
              <div className="summary-row total">
                <span>Total</span>
                <span>${Number(totalPrice).toLocaleString()}</span>
              </div>
            </div>

            {/* Método de pago */}
            <div className="payment-method">
              <h4>Método de Pago</h4>
              <div className="payment-options">
                <label className="payment-option">
                  <input
                    type="radio"
                    value="Efectivo"
                    checked={selectedPayment === 'Efectivo'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                  />
                  <span>Efectivo</span>
                </label>
                
                <label className="payment-option">
                  <input
                    type="radio"
                    value="Tarjeta"
                    checked={selectedPayment === 'Tarjeta'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                  />
                  <span>Tarjeta</span>
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    value="Domicilio"
                    checked={selectedPayment === 'Domicilio'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                  />
                  <span>Domicilio a mi casa</span>
                </label>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="cart-actions">
              {!user ? (
                <div className="login-required">
                  <p>💡 Debes iniciar sesión para realizar el pedido</p>
                  <button onClick={onNavigateToLogin} className="login-btn">
                    Iniciar Sesión
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => onCheckout(selectedPayment)}
                  disabled={loading}
                  className="checkout-btn"
                >
                  {loading ? 'Procesando...' : `Pagar $${totalPrice?.toLocaleString()}`}
                </button>
              )}

              <button 
                onClick={onClearCart}
                className="clear-cart-btn"
              >
                Vaciar Carrito
              </button>

              <button onClick={onNavigateToMenu} className="continue-shopping">
                Seguir Comprando
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;