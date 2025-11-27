import React from "react";
import styles from "./Establecimientos.module.css";

export default function SedesButton({ place, adress, localidad }) {
  return (
    <div className={styles.containerButtons}>
      <p className={styles.place}>{place}</p>
      <p className={styles.adress}>{adress}</p>
      <p className={styles.localidad}>{localidad}</p>
    </div>
  );
}