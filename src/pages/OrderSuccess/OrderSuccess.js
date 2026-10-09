import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./OrderSuccess.css";

function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  /*
    First try React Router state.
    If page is refreshed, use localStorage.
  */
  const order =
    location.state?.order ||
    JSON.parse(localStorage.getItem("latestOrder") || "null");

  if (!order) {
    return (
      <div className="success-page">
        <div className="success-card">
          <div className="success-animation">⚠️</div>

          <h1>No recent order found</h1>

          <p>Please place an order before opening this page.</p>

          <Link to="/menu" className="continue-button">
            Go to Menu
          </Link>
        </div>
      </div>
    );
  }

  const orderId = order.orderId || order.id || "ORD" + Date.now();

  const customerName = order.customer?.name || order.customerName || "Customer";

  const phone =
    order.customer?.phone || order.customerPhone || order.phone || "";

  const total = Number(order.total ?? order.totalAmount ?? 0);

  const paymentMethod =
    order.paymentMethod || order.customer?.paymentMethod || "COD";

  return (
    <main className="success-page">
      <div className="success-card">
        <div className="success-animation">✓</div>

        <span className="success-label">ORDER CONFIRMED</span>

        <h1>Your order is on its way! 🎉</h1>

        <p>
          Thank you, <strong>{customerName}</strong>. Your delicious food is
          being prepared.
        </p>

        <div className="order-number">
          <span>ORDER ID</span>

          <strong>{orderId}</strong>
        </div>

        <div className="success-details">
          <div>
            <span>Total Amount</span>

            <strong>₹{total}</strong>
          </div>

          <div>
            <span>Payment</span>

            <strong>
              {paymentMethod === "COD" ? "Cash on Delivery" : "Online Payment"}
            </strong>
          </div>

          <div>
            <span>Mobile</span>

            <strong>{phone || "Not available"}</strong>
          </div>
        </div>

        <div className="confirmation-message">
          📱 Your order confirmation has been saved successfully.
        </div>

        <div className="success-buttons">
          <Link
            to="/track-order"
            className="track-button"
            state={{
              order,
            }}
          >
            Track Order →
          </Link>

          <Link to="/menu" className="continue-button">
            Order More
          </Link>
        </div>
      </div>
    </main>
  );
}

export default OrderSuccess;
