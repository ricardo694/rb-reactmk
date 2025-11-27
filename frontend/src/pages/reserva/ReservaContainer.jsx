import { useState, useEffect, useContext } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Reserva from "./Reserva";
import { AuthContext } from "../../context/AuthContext";
import { apiService } from "../../services/api";

export default function ReservaContainer() {

  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    fecha: "",
    hora: "",
    id_mesa: "",
    cantidad_personas: ""
  });

  const [mensaje, setMensaje] = useState("");
  const [mesas, setMesas] = useState([]);

  // =============================
  // 🔥 Cargar mesas automáticamente
  // =============================
  useEffect(() => {
    const fetchMesas = async () => {
      const establecimientoId = 1; // si usas uno solo
      
      const response = await apiService.getMesas(establecimientoId);

      if (response.success) {
        setMesas(response.mesas);
      } else {
        setMesas([]);
      }
    };

    fetchMesas();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setMensaje("Debes iniciar sesión");
      return;
    }

    const data = {
      Id_usuario: user.Id_usuario,
      Id_establecimiento: 1,
      Id_mesa: form.id_mesa,
      Fecha_reserva: form.fecha,
      Hora_reserva: form.hora,
      Numero_personas: form.cantidad_personas
    };

    const response = await apiService.createReservaUser(data);

    if (response.success) {
      setMensaje("Reserva creada con éxito");
      setForm({ fecha: "", hora: "", id_mesa: "", cantidad_personas: "" });
    } else {
      setMensaje(response.message || "Error al crear la reserva");
    }
  };

  return (
    <>
      <Header />

      <Reserva
        form={form}
        mensaje={mensaje}
        mesas={mesas}          // 👈 enviar mesas al componente UI
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      <Footer />
    </>
  );
}
