// import { useEffect, useState } from "react";
// import Establecimientos from "./Establecimientos";
// import { apiService } from "../../../services/api.js";

// export default function EstablecimientosContainer() {
//   const [stores, setStores] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);
//   const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

//   const loadStores = async () => {
//     setLoading(true);
//     try {
//       const res = await apiService.getEstablecimientos(currentUser.Tipo_usuario);
//       setStores(res.establecimientos || []);
//     } catch (e) {
//       console.error(e);
//       alert("Error cargando establecimientos");
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     loadStores();
//   }, []);

//   const openCreate = () => { setEditingItem(null); setShowModal(true); };
//   const openEdit = (s) => { setEditingItem(s); setShowModal(true); };
//   const closeModal = () => { setEditingItem(null); setShowModal(false); };

//   const handleCreate = async (data) => {
//     const payload = { ...data, user_role: currentUser.Tipo_usuario };
//     const res = await apiService.createEstablecimiento(payload);
//     alert(res.message || "Respuesta servidor");
//     closeModal();
//     loadStores();
//   };

//   const handleUpdate = async (data) => {
//     const payload = { ...data, user_role: currentUser.Tipo_usuario };
//     const res = await apiService.updateEstablecimiento(payload);
//     alert(res.message || "Respuesta servidor");
//     closeModal();
//     loadStores();
//   };

//   const handleDelete = async (Id_Establecimiento) => {
//     if (!confirm("¿Eliminar establecimiento?")) return;
//     const res = await apiService.deleteEstablecimiento(Id_Establecimiento, currentUser.Tipo_usuario);
//     alert(res.message || "Respuesta servidor");
//     loadStores();
//   };

//   return (
//   <Establecimientos
//     sedes={stores}   // ✅ renombrado
//     loading={loading}
//     showModal={showModal}
//     openCreate={openCreate}
//     openEdit={openEdit}
//     closeModal={closeModal}
//     editingItem={editingItem}
//     onCreate={handleCreate}
//     onUpdate={handleUpdate}
//     onDelete={handleDelete}
//   />
//   );
// }
