import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Profile from "./profile";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

import { apiService } from "../../services/api.js";

export default function ProfileContainer() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState("pedidos");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");

    if (!userData || !userData.Id_usuario) {
      navigate("/login");
      return;
    }

    apiService.getUserOrders(userData.Id_usuario).then((data) => {
      setOrders(data);
    });

    setUser(userData);
  }, [navigate]);

  if (!user) return <div>Cargando...</div>;

  return (
    <div>
      <Header />

      <Profile
        user={user}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        orders={orders}
      />

      <Footer />
    </div>
  );
}
