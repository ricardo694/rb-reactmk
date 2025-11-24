import React from 'react'
//css
import styles from './sedes.module.css';
const SedesButton = ({place,adress,localidad}) => {
  return (
    <div className={styles.containerButtons}>
        <h4 className={styles.place}>{place}</h4>
        <p className={styles.adress}>{adress}</p>
        <p className={styles.localidad}>{localidad}</p>

        <button className={styles.button}>Seleccionar</button>
    </div>
  )
}

export default SedesButton