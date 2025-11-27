import AdminPanelContainer from "../admin/AdminPanelContainer";
import styles from "./profile.module.css";
import { useNavigate } from 'react-router-dom';

export default function Profile({ user, selectedMenu, setSelectedMenu, orders=[], reservations=[] }) {
  const navigate = useNavigate();

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("¿Seguro que quieres cerrar sesión?");
    if (!confirmLogout) return;
    localStorage.removeItem("user");
    navigate("/"); 
  };

  return (
    <div className={styles.profileContainer}>
      
      <aside className={styles.sidebar}>
        <h2 className={styles.username}>Hola, {user.Nombre}</h2>

        <ul className={styles.menuList}>
          <li
            className={`${styles.menuItem} ${selectedMenu === "pedidos" ? styles.active : ""}`}
            onClick={() => handleMenuClick("pedidos")}
          >
            📦 Pedidos
          </li>

          <li
            className={`${styles.menuItem} ${selectedMenu === "reservas" ? styles.active : ""}`}
            onClick={() => handleMenuClick("reservas")}
          >
            🪑 Reservas
          </li>

          <li
            className={`${styles.menuItem} ${selectedMenu === "cuenta" ? styles.active : ""}`}
            onClick={() => handleMenuClick("cuenta")}
          >
            👤 Cuenta
          </li>

          <li
            className={`${styles.menuItemLogout}`}
            onClick={handleLogout}
          >
            🚪 Cerrar sesión
          </li>

          {user.Tipo_usuario === "administrador" && (
            <li
              className={`${styles.menuItem} ${styles.adminMenuItem} ${selectedMenu === "admin" ? styles.active : ""}`}
              onClick={() => handleMenuClick("admin")}
            >
              👑 Panel de Admin
            </li>
          )}
        </ul>
      </aside>

      <main className={styles.main}>

        {/* Pedidos */}
        {selectedMenu === "pedidos" && (
          <div className={styles.ordersSection}>
            <h3>📦 Tus pedidos</h3>
            {(!orders || orders.length === 0) ? (
              <div className={styles.noOrdersContainer}>
                <h3>TODAVÍA NO HAS REALIZADO UN PEDIDO</h3>
                <p>Realiza tu primera orden</p>
                <button 
                  className={styles.menuButton} 
                  onClick={() => navigate("/menu")}
                >
                  Ver menú
                </button>
              </div>
            ) : (
              <ul className={styles.ordersList}>
                {orders.map((order) => (
                  <li key={order.Id_orden} className={styles.orderItem}>
                    <p><strong>Orden:</strong> {order.Codigo_orden}</p>
                    <p><strong>Fecha:</strong> {order.Fecha_orden}</p>
                    <p><strong>Total pagado:</strong> ${order.Cantidad_pago}</p>
                    <p><strong>Pago:</strong> {order.Tipo_pago}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Reservas */}
        {selectedMenu === "reservas" && (
          <div className={styles.ordersSection}>
            <h3>🪑 Tus reservas</h3>
            {(!reservations || reservations.length === 0) ? (
              <div className={styles.noOrdersContainer}>
                <h3>No tienes reservas aún</h3>
                <p>Realiza tu primera reserva</p>
                <button 
                  className={styles.menuButton} 
                  onClick={() => navigate("/reservas")}
                >
                  Hacer reserva
                </button>
              </div>
            ) : (
              <ul className={styles.ordersList}>
                  {reservations.map((res) => (
                    <li key={res.Id_reserva} className={styles.orderItem}>
                      <p><strong>Mesa:</strong> {res.Id_mesa}</p>
                      <p><strong>Fecha:</strong> {res.Fecha_reserva}</p>
                      <p><strong>Hora:</strong> {res.Hora_reserva}</p>
                      <p><strong>Estado:</strong> {res.Estado || "activo"}</p>
                    </li>
                  ))}

              </ul>
            )}
          </div>
        )}

        {/* Cuenta */}
        {selectedMenu === "cuenta" && (
          <div className={styles.contentSection}>
            <h3>👤 Mi Cuenta</h3>
            <div className={styles.accountInfo}>
              <p><strong>Nombre:</strong> {user.Nombre} {user.Apellido}</p>
              <p><strong>Email:</strong> {user.Correo_electronico}</p>
              <p><strong>Teléfono:</strong> {user.Telefono || "No registrado"}</p>
              <p><strong>Documento:</strong> {user.Documento || "No registrado"}</p>
              <p><strong>Tipo:</strong> {user.Tipo_usuario}</p>
            </div>
          </div>
        )}

        {/* Admin */}
        {selectedMenu === "admin" && user.Tipo_usuario === "administrador" && (
          <div className={styles.adminPanelContainer}>
            <AdminPanelContainer />
          </div>
        )}

      </main>
    </div>
  );
}
