import { useState, useEffect } from "react";
import styles from "./Establecimientos.module.css";

export default function Establecimientos({ stores, loading, showModal, openCreate, openEdit, closeModal, editingItem, onCreate, onUpdate, onDelete }) {
  const [form, setForm] = useState({ Id_Establecimiento: "", Nombre_sede: "", Ciudad: "", Tipo_de_mesa: "", Responsable: "", Mesero: "" });

  useEffect(() => {
    if (editingItem) {
      setForm(editingItem);
    } else {
      setForm({ Id_Establecimiento: "", Nombre_sede: "", Ciudad: "", Tipo_de_mesa: "", Responsable: "", Mesero: "" });
    }
  }, [editingItem, showModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) onUpdate(form);
    else onCreate(form);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>🏢 Establecimientos</h2>
        <button className={styles.btnPrimary} onClick={openCreate}>➕ Nuevo</button>
      </div>

      {loading ? <p>Cargando...</p> : (
        <div className={styles.grid}>
          {stores.map(s => (
            <div key={s.Id_Establecimiento} className={styles.card}>
              <h4>{s.Nombre_sede}</h4>
              <p>{s.Ciudad}</p>
              <p><small>{s.Tipo_de_mesa}</small></p>
              <div className={styles.cardActions}>
                <button onClick={() => openEdit(s)} className={styles.btnEdit}>✏️</button>
                <button onClick={() => onDelete(s.Id_Establecimiento)} className={styles.btnDelete}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <h3>{editingItem ? "✏️ Editar establecimiento" : "➕ Nuevo establecimiento"}</h3>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input placeholder="Nombre de sede" value={form.Nombre_sede} onChange={e => setForm({...form, Nombre_sede: e.target.value})} required />
              <input placeholder="Ciudad" value={form.Ciudad} onChange={e => setForm({...form, Ciudad: e.target.value})} required />
              <input placeholder="Tipo de mesa" value={form.Tipo_de_mesa} onChange={e => setForm({...form, Tipo_de_mesa: e.target.value})} />
              <input placeholder="Responsable" value={form.Responsable} onChange={e => setForm({...form, Responsable: e.target.value})} />
              <input placeholder="Mesero" value={form.Mesero} onChange={e => setForm({...form, Mesero: e.target.value})} />
              <div className={styles.modalButtons}>
                <button className={styles.btnPrimary} type="submit">Guardar</button>
                <button type="button" className={styles.btnCancel} onClick={closeModal}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
