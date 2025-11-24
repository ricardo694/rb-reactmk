import React from "react";
import styles from "./sedes.module.css";
// Components
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import SedesButton from "./SedesButton";

export default function Sedes({ sedes = [], loading }) {
  return (
    <div className={styles.sedeContainer}>
      <Header />

      <div className={styles.content}>
        {/* Columna izquierda */}
        <div className={styles.locations}>
          <h2 className={styles.title}>Encuentra tu restaurante</h2>
          <input
            type="text"
            placeholder="Busca una dirección"
            className={styles.search}
          />

          <div className={styles.sedesList}>
            {loading ? (
              <p>Cargando sedes...</p>
            ) : (
              sedes.map((s) => (
                <SedesButton
                  key={s.Id_Establecimiento}
                  place={s.Nombre_sede}
                  adress={s.Ciudad} // puedes combinar con dirección real si existe
                  localidad={s.Responsable} // o Mesero si quieres
                />
              ))
            )}
          </div>
        </div>

        {/* Columna derecha (Mapa) */}
        <div className={styles.mapSection}>
          <iframe
            className={styles.map}
            src="https://www.openstreetmap.org/export/embed.html?bbox=-74.1%2C4.6%2C-74.05%2C4.75&layer=mapnik"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <Footer />
    </div>
  );
}
