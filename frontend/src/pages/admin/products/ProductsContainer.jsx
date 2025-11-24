import { useEffect, useState } from "react";
import Products from "./products.jsx";
import { apiService } from "../../../services/api.js";

export default function ProductsContainer() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // null => create
  const [formMode, setFormMode] = useState("create"); // 'create' | 'edit'

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await apiService.getProducts(); // espera { products: [...] }
      setProducts(res.products || []);
    } catch (e) {
      console.error(e);
      alert("Error cargando productos");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const openCreate = () => {
    setEditingItem(null);
    setFormMode("create");
    setShowModal(true);
  };

  const openEdit = (product) => {
    setEditingItem(product);
    setFormMode("edit");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  // create with FormData
  const handleCreate = async (formValues, file) => {
    const fd = new FormData();
    fd.append("Nombre_producto", formValues.Nombre_producto);
    fd.append("Precio_producto", formValues.Precio_producto);
    fd.append("Tipo_producto", formValues.Tipo_producto);
    fd.append("Descripcion", formValues.Descripcion || "");
    if (file) fd.append("imagen", file);
    fd.append("user_role", currentUser.Tipo_usuario || "cliente");

    const result = await apiService.createProduct(fd);
    alert(result.message || "Respuesta servidor");
    closeModal();
    loadProducts();
  };

  // update with FormData (we use method-override _method=PUT)
  const handleUpdate = async (formValues, file) => {
    const fd = new FormData();
    fd.append("Id_producto", formValues.Id_producto);
    fd.append("Nombre_producto", formValues.Nombre_producto);
    fd.append("Precio_producto", formValues.Precio_producto);
    fd.append("Tipo_producto", formValues.Tipo_producto);
    fd.append("Descripcion", formValues.Descripcion || "");
    if (file) fd.append("imagen", file);
    fd.append("user_role", currentUser.Tipo_usuario || "cliente");
    fd.append("_method", "PUT"); // method override

    const result = await apiService.updateProduct(fd);
    alert(result.message || "Respuesta servidor");
    closeModal();
    loadProducts();
  };

  const handleDelete = async (Id_producto) => {
    if (!confirm("¿Seguro que quieres eliminar este producto?")) return;
    const result = await apiService.deleteProduct(Id_producto, currentUser.Tipo_usuario);
    alert(result.message || "Respuesta servidor");
    loadProducts();
  };

  return (
    <Products
      products={products}
      loading={loading}
      showModal={showModal}
      openCreate={openCreate}
      openEdit={openEdit}
      closeModal={closeModal}
      editingItem={editingItem}
      formMode={formMode}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
    />
  );
}
