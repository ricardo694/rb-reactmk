import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);

        const result = await apiService.getProducts(); // <-- AQUI EL CAMBIO

        if (!result.products) {
          throw new Error("La API no devolvió productos");
        }

        setProducts(result.products);
        setError(null);

      } catch (err) {
        console.error("Error al obtener productos:", err);
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return { products, loading, error };
};
