import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Cart.css";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const safeCart = Array.isArray(cart) ? cart : [];

  // -----------------------------
  // SUBTOTAL
  // -----------------------------
  const subtotal = safeCart.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 1),
    0,
  );

  // -----------------------------
  // DELIVERY FEE
  // Free delivery above ₹499
  // -----------------------------
  const deliveryFee = subtotal > 499 || subtotal === 0 ? 0 : 40;

  // -----------------------------
  // FINAL TOTAL
  // -----------------------------
  const total = subtotal + deliveryFee;

  // -----------------------------
  // EMPTY CART
  // -----------------------------
  if (safeCart.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <div className="empty-cart-card">
          <div className="empty-cart-icon">🛒</div>

          <h1>Your cart is empty</h1>

          <p>Looks like you haven't added any delicious food yet.</p>

          <Link to="/menu" className="continue-shopping">
            Explore Menu →
          </Link>
        </div>
      </div>
    );
  }

  // -----------------------------
  // CART
  // -----------------------------
  return (
    <div className="cart-page">
      <div className="cart-container">
        {/* ================= HEADER ================= */}

        <div className="cart-header">
          <div>
            <span className="cart-label">YOUR ORDER</span>

            <h1>Shopping Cart</h1>

            <p>
              {safeCart.length} item
              {safeCart.length > 1 ? "s" : ""} in your cart
            </p>
          </div>

          <button className="clear-cart-btn" onClick={clearCart}>
            Clear Cart
          </button>
        </div>

        {/* ================= MAIN LAYOUT ================= */}

        <div className="cart-layout">
          {/* ================= CART ITEMS ================= */}

          <div className="cart-items">
            {safeCart.map((item) => {
              const quantity = Number(item.quantity || 1);

              const price = Number(item.price || 0);

              const itemTotal = price * quantity;

              return (
                <div className="cart-item" key={item.id}>
                  {/* IMAGE */}

                  <div className="cart-image">
                    <img
                      src={
                        item.imageUrl ||
                        item.image ||
                        "https://via.placeholder.com/300x200?text=Food"
                      }
                      alt={item.name}
                    />
                  </div>

                  {/* DETAILS */}

                  <div className="cart-item-details">
                    <div className="cart-item-top">
                      <div>
                        <h3>{item.name}</h3>

                        <p>₹{price.toFixed(0)} per item</p>
                      </div>

                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                        title="Remove item"
                      >
                        ✕
                      </button>
                    </div>

                    {/* BOTTOM */}

                    <div className="cart-item-bottom">
                      {/* QUANTITY */}

                      <div className="quantity-control">
                        <button onClick={() => decreaseQuantity(item.id)}>
                          −
                        </button>

                        <span>{quantity}</span>

                        <button onClick={() => increaseQuantity(item.id)}>
                          +
                        </button>
                      </div>

                      {/* ITEM TOTAL */}

                      <strong className="item-total">
                        ₹{itemTotal.toFixed(0)}
                      </strong>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* CONTINUE SHOPPING */}

            <Link to="/menu" className="continue-menu">
              ← Continue Shopping
            </Link>
          </div>

          {/* ================= ORDER SUMMARY ================= */}

          <div className="order-summary">
            <div className="summary-card">
              <span className="summary-label">ORDER SUMMARY</span>

              <h2>Your Order</h2>

              {/* SUBTOTAL */}

              <div className="summary-row">
                <span>Subtotal</span>

                <strong>₹{subtotal.toFixed(0)}</strong>
              </div>

              {/* DELIVERY */}

              <div className="summary-row">
                <span>Delivery</span>

                <strong>
                  {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                </strong>
              </div>

              {/* FREE DELIVERY MESSAGE */}

              <div className="free-delivery">
                🚚 Free delivery on orders above ₹499
              </div>

              <div className="summary-divider"></div>

              {/* TOTAL */}

              <div className="summary-total">
                <span>Total</span>

                <strong>₹{total.toFixed(0)}</strong>
              </div>

              {/* CHECKOUT */}

              <button
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
                <span>→</span>
              </button>

              {/* SECURITY */}

              <div className="secure-payment">🔒 Secure & Safe Payment</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
