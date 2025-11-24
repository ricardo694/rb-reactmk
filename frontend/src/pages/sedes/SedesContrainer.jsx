import { useEffect, useState } from "react";
import Sedes from "./Sedes.jsx";
import { apiService } from "../../services/api.js"; // Ajusta ruta según tu proyecto

export default function SedesContainer() {
  const [sedes, setSedes] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}"); // si quieres filtrar por rol

  const loadSedes = async () => {
    setLoading(true);
    try {
      // Llamamos al API para traer los establecimientos
      const res = await apiService.getEstablecimientos(currentUser.Tipo_usuario);
      setSedes(res.establecimientos || []);
    } catch (e) {
      console.error("Error cargando sedes:", e);
      alert("Error al cargar sedes");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadSedes();
  }, []);

  return <Sedes sedes={sedes} loading={loading} />;
}
