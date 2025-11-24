// admin/AdminPanelContainer.jsx
import { useState, useEffect } from "react";
import AdminPanel from "./AdminPanel";
import UsersContainer from "./users/UsersContainer.jsx";
import ProductsContainer from "./products/ProductsContainer.jsx";
import EstablecimientosContainer from "./establecimientos/EstablecimientosContainer";
import { useNavigate } from "react-router-dom";

export default function AdminPanelContainer() {

  const [activeTab, setActiveTab] = useState("users");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user || !user.Id_usuario) {
      alert("Debes iniciar sesión");
      navigate("/login");
      return;
    }
    if (user.Tipo_usuario !== "administrador") {
      alert("Acceso denegado. Solo administradores.");
      navigate("/profile");
      return;
    }
  }, [navigate]);

  return (
    <AdminPanel activeTab={activeTab} setActiveTab={setActiveTab}>
      {/* Renderizar sección según el activeTab */}
      {activeTab === "users" && <UsersContainer />}
      {activeTab === "products" && <ProductsContainer />}
      {activeTab === "establecimientos" && <EstablecimientosContainer />}
    </AdminPanel>
  );
}
