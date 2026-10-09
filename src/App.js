import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CartProvider } from "./context/CartContext";

import Navbar from "./components/Navbar/Navbar";
import DemoPayment from "./pages/DemoPayment/DemoPayment";
import Home from "./pages/Home/Home";
import Menu from "./pages/Menu/Menu";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import TrackOrder from "./pages/TrackOrder/TrackOrder";
import Checkout from "./pages/Checkout/Checkout";
import Payment from "./pages/Payment/Payment";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";

import "./App.css";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        {/* Customer Navbar */}
        <Navbar />

        <Routes>
          {/* ==================== HOME ==================== */}
          <Route path="/" element={<Home />} />

          {/* ==================== MENU ==================== */}
          <Route path="/menu" element={<Menu />} />

          {/* ==================== CART ==================== */}
          <Route path="/cart" element={<Cart />} />

          {/* ==================== AUTHENTICATION ==================== */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ==================== CHECKOUT ==================== */}
          <Route path="/checkout" element={<Checkout />} />

          {/* ==================== PAYMENT ==================== */}
          <Route path="/payment" element={<Payment />} />

          {/* ==================== ORDER SUCCESS ==================== */}
          <Route path="/order-success" element={<OrderSuccess />} />

          {/* ==================== TRACK ORDER ==================== */}
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/demo-payment" element={<DemoPayment />} />

          {/* ==================== 404 PAGE ==================== */}
          <Route
            path="*"
            element={
              <div
                style={{
                  minHeight: "70vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "40px",
                }}
              >
                <h1 style={{ fontSize: "64px", margin: 0 }}>404</h1>

                <h2>Page Not Found</h2>

                <p>Sorry, the page you are looking for does not exist.</p>

                <a
                  href="/"
                  style={{
                    display: "inline-block",
                    marginTop: "20px",
                    padding: "12px 25px",
                    background: "#ff6b35",
                    color: "#fff",
                    textDecoration: "none",
                    borderRadius: "8px",
                    fontWeight: "600",
                  }}
                >
                  Go Home
                </a>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
