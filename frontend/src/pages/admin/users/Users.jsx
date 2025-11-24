// admin/users/Users.jsx
import { useState, useEffect } from "react";
import styles from "./users.module.css";

export default function Users({
  users,
  loading,
  showModal,
  editingItem,
  openEdit,
  openCreate,
  closeModal,
  onUpdate,
  onDelete
}) {
  const [form, setForm] = useState({});

  useEffect(() => {
    if (editingItem) {
      // Si se edita, NO se establece contraseña
      setForm(editingItem);
    } else {
      // Si se crea usuario nuevo, contraseña vacía
      setForm({
        Nombre: "",
        Apellido: "",
        Correo_electronico: "",
        Telefono: "",
        Documento: "",
        Tipo_usuario: "cliente",
        Password: "" // ← importante
      });
    }
  }, [editingItem, showModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(form);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Gestión de Usuarios</h2>
        <button onClick={openCreate} className={styles.btnPrimary}>➕ Nuevo</button>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th><th>Nombre</th><th>Email</th><th>Tel</th><th>Tipo</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.Id_usuario}>
                <td>{u.Id_usuario}</td>
                <td>{u.Nombre} {u.Apellido}</td>
                <td>{u.Correo_electronico}</td>
                <td>{u.Telefono}</td>
                <td>{u.Tipo_usuario}</td>
                <td>
                  <button className={styles.btnEdit} onClick={() => openEdit(u)}>✏️</button>
                  <button className={styles.btnDelete} onClick={() => onDelete(u.Id_usuario)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <h3>{editingItem ? "✏️ Editar Usuario" : "➕ Nuevo Usuario"}</h3>

            <form onSubmit={handleSubmit}>
              <input
                placeholder="Nombre"
                value={form.Nombre || ""}
                onChange={(e) => setForm({ ...form, Nombre: e.target.value })}
                required
              />

              <input
                placeholder="Apellido"
                value={form.Apellido || ""}
                onChange={(e) => setForm({ ...form, Apellido: e.target.value })}
              />

              <input
                placeholder="Documento"
                value={form.Documento || ""}
                onChange={(e) => setForm({ ...form, Documento: e.target.value })}
              />

              <input
                placeholder="Teléfono"
                value={form.Telefono || ""}
                onChange={(e) => setForm({ ...form, Telefono: e.target.value })}
              />

              <input
                placeholder="Email"
                type="email"
                value={form.Correo_electronico || ""}
                onChange={(e) =>
                  setForm({ ...form, Correo_electronico: e.target.value })
                }
                required
              />

              <select
                value={form.Tipo_usuario || "cliente"}
                onChange={(e) =>
                  setForm({ ...form, Tipo_usuario: e.target.value })
                }
              >
                <option value="cliente">Cliente</option>
                <option value="administrador">Administrador</option>
              </select>

              {/* 🔥 Campo contraseña SOLO en creación */}
              {!editingItem && (
                <input
                  placeholder="Contraseña"
                  type="password"
                  value={form.Password || ""}
                  onChange={(e) => setForm({ ...form, Password: e.target.value })}
                  required
                />
              )}

              <div className={styles.modalButtons}>
                <button className={styles.btnPrimary} type="submit">
                  Guardar
                </button>
                <button
                  type="button"
                  className={styles.btnCancel}
                  onClick={closeModal}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
