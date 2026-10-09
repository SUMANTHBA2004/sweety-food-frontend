import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const API_URL = "http://localhost:8081/api";

function Checkout() {
  const navigate = useNavigate();

  // ==========================================
  // CART
  // ==========================================

  const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");

  const [cart] = useState(Array.isArray(storedCart) ? storedCart : []);

  // ==========================================
  // FORM
  // ==========================================

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
  });

  // ==========================================
  // PAYMENT
  // ==========================================

  const [paymentMethod, setPaymentMethod] = useState("COD");

  // ==========================================
  // LOADING
  // ==========================================

  const [loading, setLoading] = useState(false);

  // ==========================================
  // ERROR
  // ==========================================

  const [error, setError] = useState("");

  // ==========================================
  // PRICE
  // ==========================================

  const subtotal = cart.reduce((total, item) => {
    const price = Number(item.price) || 0;

    const quantity = Number(item.quantity) || 1;

    return total + price * quantity;
  }, 0);

  const deliveryFee = subtotal >= 499 || subtotal === 0 ? 0 : 40;

  const totalAmount = subtotal + deliveryFee;

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  // ==========================================
  // VALIDATION
  // ==========================================

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Please enter your full name.");

      return false;
    }

    if (!formData.phone.trim()) {
      setError("Please enter your phone number.");

      return false;
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      setError("Please enter a valid 10-digit Indian mobile number.");

      return false;
    }

    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      setError("Please enter a valid email address.");

      return false;
    }

    if (!formData.address.trim()) {
      setError("Please enter your delivery address.");

      return false;
    }

    if (!formData.city.trim()) {
      setError("Please enter your city.");

      return false;
    }

    if (!/^\d{6}$/.test(formData.pincode.trim())) {
      setError("Please enter a valid 6-digit pincode.");

      return false;
    }

    if (cart.length === 0) {
      setError("Your cart is empty.");

      return false;
    }

    return true;
  };

  // ==========================================
  // PLACE ORDER
  // ==========================================

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // ======================================
      // USER
      // ======================================

      let storedUser = null;

      try {
        storedUser = JSON.parse(localStorage.getItem("user") || "null");
      } catch (e) {
        storedUser = null;
      }

      const customerId =
        storedUser?.id ?? storedUser?.customerId ?? storedUser?.userId ?? null;

      // ======================================
      // ORDER ITEMS
      // ======================================

      const orderItems = cart.map((item, index) => {
        const productId = Number(item.id ?? item.productId ?? item._id);

        const quantity = Number(item.quantity) || 1;

        const price = Number(item.price) || 0;

        return {
          productId: Number.isFinite(productId) ? productId : index + 1,

          productName: item.name || item.productName || "Food Item",

          quantity: quantity > 0 ? quantity : 1,

          price: price >= 0 ? price : 0,

          productImage: item.image || item.productImage || "",
        };
      });

      // ======================================
      // BACKEND REQUEST
      // ======================================

      const orderRequest = {
        customerId: customerId !== null ? Number(customerId) : null,

        customerName: formData.name.trim(),

        phone: formData.phone.trim(),

        email: formData.email.trim(),

        /*
         * ⭐⭐⭐ IMPORTANT ⭐⭐⭐
         *
         * Backend expects "address".
         *
         * DO NOT change this to
         * deliveryAddress.
         */
        address: formData.address.trim(),

        city: formData.city.trim(),

        pincode: formData.pincode.trim(),

        paymentMethod: paymentMethod,

        items: orderItems,
      };

      // ======================================
      // DEBUG
      // ======================================

      console.log("================================");

      console.log("SWEETLY FOOD ORDER REQUEST");

      console.log(JSON.stringify(orderRequest, null, 2));

      console.log("ADDRESS:", orderRequest.address);

      console.log("ITEMS:", orderRequest.items);

      console.log("================================");

      // ======================================
      // API CALL
      // ======================================

      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(orderRequest),
      });

      // ======================================
      // RESPONSE
      // ======================================

      const responseText = await response.text();

      console.log("SERVER STATUS:", response.status);

      console.log("SERVER RESPONSE:", responseText);

      // ======================================
      // ERROR
      // ======================================

      if (!response.ok) {
        let errorMessage = responseText;

        try {
          const errorJson = JSON.parse(responseText);

          if (errorJson.errors) {
            errorMessage = Object.entries(errorJson.errors)
              .map(([field, message]) => `${field}: ${message}`)
              .join("\n");
          }

          if (errorJson.message) {
            errorMessage =
              errorJson.message +
              (errorJson.errors
                ? "\n" +
                  Object.entries(errorJson.errors)
                    .map(([field, message]) => `${field}: ${message}`)
                    .join("\n")
                : "");
          }
        } catch (parseError) {
          // Keep text response
        }

        throw new Error(`Order failed (${response.status})\n${errorMessage}`);
      }

      // ======================================
      // SUCCESS
      // ======================================

      let savedOrder;

      try {
        savedOrder = JSON.parse(responseText);
      } catch (parseError) {
        throw new Error("Order was saved but server returned invalid JSON.");
      }

      console.log("ORDER SAVED:", savedOrder);

      // ======================================
      // LOCAL STORAGE
      // ======================================

      localStorage.setItem("latestOrder", JSON.stringify(savedOrder));

      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");

      const ordersArray = Array.isArray(existingOrders) ? existingOrders : [];

      ordersArray.unshift(savedOrder);

      localStorage.setItem("orders", JSON.stringify(ordersArray));

      // ======================================
      // CLEAR CART
      // ======================================

      localStorage.removeItem("cart");

      // ======================================
      // SUCCESS MESSAGE
      // ======================================

      alert(`Order placed successfully!\n\nOrder ID: ${savedOrder.id}`);

      // ======================================
      // NAVIGATE
      // ======================================

      navigate("/order-success", {
        state: {
          order: savedOrder,
        },
      });
    } catch (error) {
      console.error("ORDER PLACEMENT ERROR:", error);

      setError(error.message || "Unable to place order.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // EMPTY CART
  // ==========================================

  if (cart.length === 0) {
    return (
      <main className="checkout-page">
        <div className="empty-checkout">
          <div className="empty-icon">🛒</div>

          <h1>Your Cart is Empty</h1>

          <p>Please add some delicious food before checkout.</p>

          <button
            type="button"
            onClick={() => navigate("/menu")}
            className="back-menu-btn"
          >
            Browse Menu
          </button>
        </div>
      </main>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <header className="checkout-header">
          <span>SECURE CHECKOUT</span>

          <h1>Complete Your Order</h1>

          <p>Enter your delivery details and choose your payment method.</p>
        </header>

        <form className="checkout-layout" onSubmit={handlePlaceOrder}>
          {/* =================================
              LEFT
          ================================= */}

          <section className="checkout-left">
            {/* CUSTOMER */}

            <div className="checkout-card">
              <div className="card-heading">
                <span className="step-number">1</span>

                <div>
                  <h2>Customer Information</h2>

                  <p>Enter your contact details</p>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name *</label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number *</label>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength="10"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Email Address</label>

                  <input
                    type="email"
                    name="email"
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                  />

                  <small>Email is optional.</small>
                </div>
              </div>
            </div>

            {/* ADDRESS */}

            <div className="checkout-card">
              <div className="card-heading">
                <span className="step-number">2</span>

                <div>
                  <h2>Delivery Address</h2>

                  <p>Where should we deliver your food?</p>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Complete Address *</label>

                  <textarea
                    name="address"
                    placeholder="House/Flat No, Street, Area..."
                    value={formData.address}
                    onChange={handleChange}
                    rows="4"
                  />
                </div>

                <div className="form-group">
                  <label>City *</label>

                  <input
                    type="text"
                    name="city"
                    placeholder="Enter your city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Pincode *</label>

                  <input
                    type="text"
                    name="pincode"
                    placeholder="6-digit pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    maxLength="6"
                  />
                </div>
              </div>
            </div>

            {/* PAYMENT */}

            <div className="checkout-card">
              <div className="card-heading">
                <span className="step-number">3</span>

                <div>
                  <h2>Payment Method</h2>

                  <p>Select how you want to pay</p>
                </div>
              </div>

              <div className="payment-options">
                <label
                  className={`payment-option ${
                    paymentMethod === "ONLINE" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="ONLINE"
                    checked={paymentMethod === "ONLINE"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />

                  <div className="payment-icon">💳</div>

                  <div className="payment-content">
                    <strong>Online Payment</strong>

                    <span>UPI, Card or Net Banking</span>
                  </div>

                  <div className="payment-check">
                    {paymentMethod === "ONLINE" ? "✓" : ""}
                  </div>
                </label>

                <label
                  className={`payment-option ${
                    paymentMethod === "COD" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />

                  <div className="payment-icon">💵</div>

                  <div className="payment-content">
                    <strong>Cash on Delivery</strong>

                    <span>Pay when your order arrives</span>
                  </div>

                  <div className="payment-check">
                    {paymentMethod === "COD" ? "✓" : ""}
                  </div>
                </label>
              </div>
            </div>

            {/* ERROR */}

            {error && (
              <div className="checkout-error">
                ⚠️
                <pre>{error}</pre>
              </div>
            )}
          </section>

          {/* =================================
              RIGHT
          ================================= */}

          <aside className="checkout-right">
            <div className="checkout-card order-summary">
              <div className="summary-header">
                <h2>Order Summary</h2>

                <span>
                  {cart.length} {cart.length === 1 ? "item" : "items"}
                </span>
              </div>

              <div className="checkout-items">
                {cart.map((item, index) => {
                  const price = Number(item.price) || 0;

                  const quantity = Number(item.quantity) || 1;

                  return (
                    <div
                      className="checkout-item"
                      key={item.id ?? `${item.name}-${index}`}
                    >
                      <div className="item-image">
                        {item.image ? (
                          <img src={item.image} alt={item.name} />
                        ) : (
                          <span>🍽️</span>
                        )}
                      </div>

                      <div className="item-details">
                        <h3>{item.name}</h3>

                        <p>
                          ₹{price.toFixed(2)}
                          {" × "}
                          {quantity}
                        </p>
                      </div>

                      <strong>₹{(price * quantity).toFixed(2)}</strong>
                    </div>
                  );
                })}
              </div>

              <div className="price-details">
                <div className="price-row">
                  <span>Subtotal</span>

                  <strong>₹{subtotal.toFixed(2)}</strong>
                </div>

                <div className="price-row">
                  <span>Delivery Fee</span>

                  <strong>
                    {deliveryFee === 0 ? "FREE" : `₹${deliveryFee.toFixed(2)}`}
                  </strong>
                </div>

                {subtotal > 0 && subtotal < 499 && (
                  <p className="delivery-message">
                    Add ₹{(499 - subtotal).toFixed(2)} more for FREE delivery.
                  </p>
                )}

                <div className="price-divider"></div>

                <div className="total-row">
                  <span>Total</span>

                  <strong>₹{totalAmount.toFixed(2)}</strong>
                </div>
              </div>

              <div className="selected-payment">
                <span>Payment</span>

                <strong>
                  {paymentMethod === "ONLINE"
                    ? "💳 Online Payment"
                    : "💵 Cash on Delivery"}
                </strong>
              </div>

              <button
                type="submit"
                className="place-order-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Processing...
                  </>
                ) : (
                  <>
                    Place Order
                    <span>→</span>
                  </>
                )}
              </button>

              <p className="secure-text">
                🔒 Your order information is secure.
              </p>
            </div>

            <button
              type="button"
              className="back-cart-btn"
              onClick={() => navigate("/cart")}
            >
              ← Back to Cart
            </button>
          </aside>
        </form>
      </div>
    </main>
  );
}

export default Checkout;
