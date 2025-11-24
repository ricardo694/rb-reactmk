import React from "react";
import styles from "./sedes.module.css";
//-----Components
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import SedesButton from "./SedesButton";

export default function Menu() {
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
            <SedesButton
              place="FASTIE KIOSCO 3 PORTOALEGRE"
              adress="Cra. 58 #137B-01"
              localidad="Bogotá"
            />
            <SedesButton
              place="Colina"
              adress="Calle 138 #58-36"
              localidad="Bogotá"
            />
            <SedesButton
              place="Calle 125"
              adress="Calle 125"
              localidad="Bogotá"
            />
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
