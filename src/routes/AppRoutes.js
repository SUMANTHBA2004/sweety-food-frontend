import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Cart from "../pages/Cart/Cart";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default AppRoutes;
