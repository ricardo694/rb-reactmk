// admin/AdminPanel.jsx
import styles from "./AdminPanel.module.css";

export default function AdminPanel({ activeTab, setActiveTab, children }) {
  return (
    <div className={styles.adminPanel}>
      <div className={styles.header}>
        <h1>👑 Panel de Administrador</h1>
      </div>

      <div className={styles.tabs}>
        <button className={activeTab === "users" ? styles.active : ""} onClick={() => setActiveTab("users")}>👥 Usuarios</button>
        <button className={activeTab === "products" ? styles.active : ""} onClick={() => setActiveTab("products")}>🍕 Productos</button>
        {/* <button className={activeTab === "establecimientos" ? styles.active : ""} onClick={() => setActiveTab("establecimientos")}>🏢 Establecimientos</button> */}

      </div>

      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
