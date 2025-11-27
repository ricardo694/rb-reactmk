import styles from "./Reserva.module.css";

export default function Reserva({
  form,
  mensaje,
  mesas,
  handleChange,
  handleSubmit
}) {
  return (
    <div className={styles.reservaContainer}>
      <h2 className={styles.title}>Reservar Mesa</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        
        <label className={styles.label}>Fecha:</label>
        <input
          type="date"
          name="fecha"
          className={styles.input}
          value={form.fecha}
          onChange={handleChange}
        />

        <label className={styles.label}>Hora:</label>
        <input
          type="time"
          name="hora"
          className={styles.input}
          value={form.hora}
          onChange={handleChange}
        />

        <label className={styles.label}>Número de mesa:</label>
        <select
          name="id_mesa"
          className={styles.select}
          value={form.id_mesa}
          onChange={handleChange}
        >
          <option value="">Seleccionar mesa</option>

          {mesas.length > 0
            ? mesas.map((mesa) => (
                <option key={mesa.Id_mesa} value={mesa.Id_mesa}>
                  Mesa {mesa.Numero_mesa} — Capacidad {mesa.Capacidad}
                </option>
              ))
            : <option disabled>No hay mesas registradas</option>
          }
        </select>

        <label className={styles.label}>Cantidad de personas:</label>
        <input
          type="number"
          name="cantidad_personas"
          className={styles.input}
          value={form.cantidad_personas}
          min="1"
          max="12"
          onChange={handleChange}
        />

        <button className={styles.button}>Reservar</button>
      </form>

      {mensaje && <p className={styles.message}>{mensaje}</p>}
    </div>
  );
}
