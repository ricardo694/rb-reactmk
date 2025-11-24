import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { ShoppingCart } from 'lucide-react';
import './CartWidget.css'; // Tu CSS actual

const CartWidget = () => {
  const { user } = useAuth();
  const { getTotalItems, cartItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const totalItems = getTotalItems();

  // Si no hay usuario logueado, no mostrar el carrito
  if (!user) {
    return null;
  }

  const handleViewCart = () => {
    setIsOpen(false);
    navigate('/cart');
  };

  return (
    <div className="cart-widget">
      <button 
        className="cart-button"
        onClick={() => setIsOpen(!isOpen)}
        title="Ver carrito"
      >
        <ShoppingCart size={20} />
        {totalItems > 0 && (
          <span className="cart-badge">
            {totalItems}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="cart-dropdown">
          <div className="cart-dropdown-header">
            <h3>Tu Carrito</h3>
            <span>{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
          </div>
          
          <div className="cart-dropdown-content">
            {totalItems === 0 ? (
              <div className="empty-cart-message">
                <p>Tu carrito está vacío</p>
                <small>Agrega productos desde el menú</small>
              </div>
            ) : (
              <>
                <div className="cart-preview-items">
                  {cartItems.slice(0, 3).map(item => (
                    <div key={item.Id_producto} className="preview-item">
                      <span className="preview-item-name">{item.Nombre_producto}</span>
                      <span className="preview-item-quantity">x{item.cantidad}</span>
                    </div>
                  ))}
                  {cartItems.length > 3 && (
                    <div className="preview-more">
                      +{cartItems.length - 3} más...
                    </div>
                  )}
                </div>
                <button onClick={handleViewCart} className="view-cart-btn">
                  Ver Carrito Completo
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartWidget;