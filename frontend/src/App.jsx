import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { CartProvider } from "./context/CartProvider";
import { ProductProvider } from "./context/ProductProvider";
import CartContainer from './pages/cart/CartContainer';

// Components
import Home from "./pages/home/home";
import Menu from "./pages/menu/Menu";
import Sede from "./pages/sedes/Sedes";
import Profile from "./pages/profile/profileContainer";
import SignUpContainer from "./pages/signUp/signUpContainer";
import Sobre from "./pages/sobre/Sobre";
import LoginContainer from "./pages/login/loginContainer";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginContainer />} />
              <Route path="/sign-up" element={<SignUpContainer />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/sede" element={<Sede />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/home" element={<Home />} />
              <Route path="/nosotros" element={<Sobre />} />
              <Route path="/cart" element={<CartContainer />} />
            </Routes>
          </BrowserRouter>
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;