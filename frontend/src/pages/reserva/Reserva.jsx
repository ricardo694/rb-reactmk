import { useState, useContext } from "react";
import { apiService } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Reserva.module.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
export default function Reserva() {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    fecha: "",
    hora: "",
    id_mesa: "",
    cantidad_personas: ""
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const enviar = async (e) => {
  e.preventDefault();

  const dataEnviar = {
    Id_usuario: 1, // ← O el ID real del usuario autenticado
    Id_establecimiento: 1, // ← O el establecimiento real
    Id_mesa: formData.id_mesa,
    Fecha_reserva: formData.fecha,
    Hora_reserva: formData.hora,
    Numero_personas: formData.cantidad_personas,
  };

  try {
    const resp = await apiService.createReservaUser(dataEnviar);
    console.log("Respuesta:", resp);
    setMensaje("Reserva realizada exitosamente ✔️");
  } catch (error) {
    setMensaje("Error al registrar reserva ❌");
  }
};


  return (
    <div>
        <Header/>
        <div className={styles.reservaContainer}>
            <h2 className={styles.title}>Reservar Mesa</h2>

            <form className={styles.form} onSubmit={enviar}>
                
                <label className={styles.label}>Fecha:</label>
                <input
                type="date"
                name="fecha"
                className={styles.input}
                onChange={handleChange}
                />

                <label className={styles.label}>Hora:</label>
                <input
                type="time"
                name="hora"
                className={styles.input}
                onChange={handleChange}
                />

                <label className={styles.label}>Número de mesa:</label>
                <select
                name="id_mesa"
                className={styles.select}
                onChange={handleChange}
                >
                <option value="">Seleccionar mesa</option>
                <option value="1">Mesa 1</option>
                <option value="2">Mesa 2</option>
                <option value="3">Mesa 3</option>
                </select>

                <label className={styles.label}>Cantidad de personas:</label>
                <input
                type="number"
                name="cantidad_personas"
                className={styles.input}
                min="1"
                max="12"
                onChange={handleChange}
                />

                <button className={styles.button}>Reservar</button>
            </form>

            {mensaje && <p className={styles.message}>{mensaje}</p>}
            </div>
    <Footer/>
    </div>
    
    
  );
}
