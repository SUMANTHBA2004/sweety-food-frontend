import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./OrderSuccess.css";

function OrderSuccess() {
  const location = useLocation();

  // Retrieve the saved order from localStorage.
  let savedOrder = null;

  try {
    savedOrder = JSON.parse(localStorage.getItem("latestOrder") || "null");
  } catch (error) {
    console.error("Unable to read saved order:", error);
  }

  // Prefer the order passed through React Router state.
  const order = location.state?.order || savedOrder;

  // Show a message if no order is available.
  if (!order) {
    return (
      <main className="success-page">
        <div className="success-card">
          <div className="success-animation">⚠️</div>

          <h1>No Recent Order Found</h1>

          <p>Please place an order before opening this page.</p>

          <Link to="/menu" className="continue-button">
            Go to Menu
          </Link>
        </div>
      </main>
    );
  }

  // Order information.
  const orderId = order.orderId || order.id || "Pending";

  const customerName =
    order.customer?.name || order.customerName || order.name || "Customer";

  const phone =
    order.customer?.phone || order.customerPhone || order.phone || "";

  const total = Number(order.total ?? order.totalAmount ?? 0);

  const paymentMethod =
    order.paymentMethod || order.customer?.paymentMethod || "COD";

  const formattedTotal = Number.isFinite(total) ? total.toFixed(2) : "0.00";

  const isCashOnDelivery = String(paymentMethod).toUpperCase() === "COD";

  return (
    <main className="success-page">
      <div className="success-card">
        <div className="success-animation">✓</div>

        <span className="success-label">ORDER CONFIRMED</span>

        <h1>Your Order Is Confirmed! 🎉</h1>

        <p>
          Thank you, <strong>{customerName}</strong>! Your delicious food is
          being prepared.
        </p>

        <div className="order-number">
          <span>ORDER ID</span>
          <strong>{orderId}</strong>
        </div>

        <div className="success-details">
          <div>
            <span>Total Amount</span>
            <strong>₹{formattedTotal}</strong>
          </div>

          <div>
            <span>Payment Method</span>
            <strong>
              {isCashOnDelivery ? "Cash on Delivery" : "Online Payment"}
            </strong>
          </div>

          <div>
            <span>Mobile Number</span>
            <strong>{phone || "Not available"}</strong>
          </div>
        </div>

        <div className="confirmation-message">
          📱 Your order details are available on this page.
        </div>

        <div className="success-buttons">
          <Link to="/track-order" className="track-button" state={{ order }}>
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
