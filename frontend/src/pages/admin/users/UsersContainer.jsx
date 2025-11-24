// admin/users/UsersContainer.jsx
import { useEffect, useState } from "react";
import Users from "./Users";
import { apiService } from "../../../services/api.js";

export default function UsersContainer() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

const loadUsers = async () => {
  setLoading(true);
  console.log("🔍 Cargando usuarios...");
  const res = await apiService.getAllUsers(currentUser.Tipo_usuario);
  console.log("➡ Usuarios recibidos:", res);
  setUsers(res.usuarios || []);
  setLoading(false);
};


  useEffect(() => { loadUsers(); }, []);

  const openEdit = (u) => { setEditingItem(u); setShowModal(true); };
  const openCreate = () => { setEditingItem(null); setShowModal(true); };
  const close = () => { setEditingItem(null); setShowModal(false); };

const handleUpdate = async (payload) => {
  let res;

  if (!payload.Id_usuario) {
    // CREAR
    res = await apiService.createUser(payload, currentUser.Tipo_usuario);
  } else {
    // EDITAR
    res = await apiService.updateUser(payload, currentUser.Tipo_usuario);
  }

  alert(res.message);
  close();
  loadUsers();
};


  const handleDelete = async (Id_usuario) => {
    if (!confirm("¿Eliminar usuario?")) return;
    const res = await apiService.deleteUser(Id_usuario, currentUser.Tipo_usuario);
    alert(res.message || "Respuesta servidor");
    loadUsers();
  };


  return (
    <Users
      users={users}
      loading={loading}
      showModal={showModal}
      editingItem={editingItem}
      openEdit={openEdit}
      openCreate={openCreate}
      closeModal={close}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
    />
  );
}
