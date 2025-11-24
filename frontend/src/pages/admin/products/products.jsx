import { useState, useEffect } from "react";
import styles from "./Products.module.css";

export default function Products({
  products,
  loading,
  showModal,
  openCreate,
  openEdit,
  closeModal,
  editingItem,
  formMode,
  onCreate,
  onUpdate,
  onDelete,
}) {
  // local form state for modal (controlled from UI)
  const [form, setForm] = useState({
    Id_producto: "",
    Nombre_producto: "",
    Precio_producto: "",
    Tipo_producto: "",
    Descripcion: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

 useEffect(() => {
  if (editingItem) {
    setForm({
      Id_producto: editingItem.Id_producto,
      Nombre_producto: editingItem.Nombre_producto,
      Precio_producto: editingItem.Precio_producto,
      Tipo_producto: editingItem.Tipo_producto,
      Descripcion: editingItem.Descripcion,
    });
    setPreview(editingItem.imageUrl || null);
  } else {
    setForm({
      Id_producto: "",
      Nombre_producto: "",
      Precio_producto: "",
      Tipo_producto: "",
      Descripcion: "",
    });
    setFile(null);
    setPreview(null);
  }
}, [editingItem, showModal]);
  const handleFileChange = (e) => {
    const f = e.target.files[0];
    setFile(f);
    if (f) setPreview(URL.createObjectURL(f));
    else setPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formMode === "create") onCreate(form, file);
    else onUpdate(form, file);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>🍕 Gestión de Productos</h2>
        <button className={styles.btnPrimary} onClick={openCreate}>➕ Nuevo producto</button>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Tipo</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td><img src={p.imageUrl} alt={p.nombre} className={styles.img} /></td>
                <td>{p.nombre}</td>
                <td>${p.precio}</td>
                <td>{p.tipo}</td>
                <td>{p.descripcion?.substring(0, 60)}</td>
                <td>
                  <button className={styles.btnEdit} onClick={() => openEdit({
                    Id_producto: p.id,
                    Nombre_producto: p.nombre,
                    Precio_producto: p.precio,
                    Tipo_producto: p.tipo,
                    Descripcion: p.descripcion,
                    imageUrl: p.imageUrl,
                  })}>✏️</button>
                  <button className={styles.btnDelete} onClick={() => onDelete(p.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {showModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <h3>{formMode === "create" ? "➕ Crear producto" : "✏️ Editar producto"}</h3>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                type="text"
                placeholder="Nombre"
                value={form.Nombre_producto}
                onChange={(e) => setForm({...form, Nombre_producto: e.target.value})}
                required
              />
              <input
                type="number"
                step="1"
                placeholder="Precio"
                value={form.Precio_producto}
                onChange={(e) => setForm({...form, Precio_producto: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Tipo"
                value={form.Tipo_producto}
                onChange={(e) => setForm({...form, Tipo_producto: e.target.value})}
                required
              />
              <textarea
                placeholder="Descripción"
                value={form.Descripcion}
                onChange={(e) => setForm({...form, Descripcion: e.target.value})}
              />
              <div className={styles.fileRow}>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                {preview && <img src={preview} alt="preview" className={styles.preview} />}
              </div>

              <div className={styles.modalButtons}>
                <button type="submit" className={styles.btnPrimary}>Guardar</button>
                <button type="button" className={styles.btnCancel} onClick={closeModal}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
