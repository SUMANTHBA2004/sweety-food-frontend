import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";

import "./Navbar.css";

function Navbar() {
  const { cart } = useCart();

  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = Array.isArray(cart)
    ? cart.reduce((total, item) => total + (item.quantity || 1), 0)
    : 0;

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* ================= LOGO ================= */}

        <Link to="/" className="brand" onClick={closeMenu}>
          <div className="brand-icon">🍴</div>

          <div className="brand-text">
            <span className="brand-name">Sweetly</span>

            <span className="brand-subtitle">FOOD & RESTAURANT</span>
          </div>
        </Link>

        {/* ================= DESKTOP NAVIGATION ================= */}

        <nav className="nav-menu">
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Home
          </Link>

          <Link
            to="/menu"
            className={location.pathname === "/menu" ? "active" : ""}
          >
            Menu
          </Link>

          <Link
            to="/cart"
            className={location.pathname === "/cart" ? "active" : ""}
          >
            Cart
          </Link>

          <Link
            to="/track-order"
            className={location.pathname === "/track-order" ? "active" : ""}
          >
            Track Order
          </Link>
        </nav>

        {/* ================= RIGHT SIDE ================= */}

        <div className="navbar-actions">
          <Link to="/login" className="login-link">
            Login
          </Link>

          <Link to="/cart" className="cart-button">
            🛒
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>

        {/* ================= MOBILE MENU BUTTON ================= */}

        <button
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* ================= MOBILE NAVIGATION ================= */}

      <div className={`mobile-menu ${menuOpen ? "mobile-menu-open" : ""}`}>
        <Link
          to="/"
          className={location.pathname === "/" ? "mobile-active" : ""}
          onClick={closeMenu}
        >
          <span>🏠</span>
          Home
        </Link>

        <Link
          to="/menu"
          className={location.pathname === "/menu" ? "mobile-active" : ""}
          onClick={closeMenu}
        >
          <span>🍕</span>
          Menu
        </Link>

        <Link
          to="/cart"
          className={location.pathname === "/cart" ? "mobile-active" : ""}
          onClick={closeMenu}
        >
          <span>🛒</span>
          Cart
          {cartCount > 0 && (
            <span className="mobile-cart-count">{cartCount}</span>
          )}
        </Link>

        <Link
          to="/track-order"
          className={
            location.pathname === "/track-order" ? "mobile-active" : ""
          }
          onClick={closeMenu}
        >
          <span>📦</span>
          Track Order
        </Link>

        <Link to="/login" className="mobile-login" onClick={closeMenu}>
          <span>👤</span>
          Login
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
