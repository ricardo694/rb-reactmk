import React from 'react';
import styles from './card.module.css';
import { useCart } from '../../hooks/useCart';

const Card = ({ id, nombre, precio, descripcion, imageUrl }) => {

  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart({
      Id_producto: id,
      Nombre_producto: nombre,
      Precio_producto: precio,
      Imagen: imageUrl,
      cantidad: 1
    });
  };

  return (
    <div className={styles.card}>
      <img className={styles.productImg} src={imageUrl} alt={nombre} />
      <h3 className={styles.productTitle}>{nombre}</h3>
      <p className={styles.productDescription}>{descripcion}</p>
      <strong className={styles.productPrice}>${precio}</strong>

      <button className={styles.addButton} onClick={handleAdd}>
        Añadir al carrito
      </button>
    </div>
  );
};

export default Card;
