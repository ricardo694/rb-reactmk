import React, {  useState, useEffect } from 'react';
import styles from "./menu.module.css";
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Card  from '../../components/card/card';
import { useProducts } from '../../hooks/useProducts';
import { useNavigate } from "react-router-dom";
const Menu = () => {
  const { products, loading, error } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  console.log("PRODUCTOS:", products);

  // Agrupar productos por categoría
  const categories = [...new Set(products.map(p => p.tipo))];
  
  // Filtrar productos según la categoría seleccionada
  const filteredProducts = selectedCategory 
  ? products.filter(p => p.tipo === selectedCategory)
  : products;

  if (loading) {
    return (
      <div>
        <Header />
        <div className={styles.container}>
          <p>Cargando productos...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <div className={styles.container}>
          <p>Error al cargar los productos: {error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />

      <div className={styles.buttonsContainer}>
        <button 
          className={`${styles.buttons} ${selectedCategory === null ? styles.active : ''}`}
          onClick={() => setSelectedCategory(null)}
        >
          <span>Todos</span>
        </button>

        <button onClick={() => navigate("/reservas")}>
          Reservar mesa
        </button>

        {categories.map((category) => (
          <button 
            key={category}
            className={`${styles.buttons} ${selectedCategory === category ? styles.active : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            <span>{category}</span>
          </button>

          
        ))}
      </div>

      <div className={styles.targetsContainer}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card 
              key={product.id}
              id={product.id}
              imageUrl={product.imageUrl}
              nombre={product.nombre}
              descripcion={product.descripcion}
              precio={product.precio}
              type={product.tipo}
            />
          ))
        ) : (
          <p>No hay productos en esta categoría</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Menu;