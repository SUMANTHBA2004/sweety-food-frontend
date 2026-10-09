import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./TrackOrder.css";

function TrackOrder() {
  const location = useLocation();

  const orderId = location.state?.orderId || "SW123456";

  return (
    <div className="track-page">
      <div className="track-container">
        <div className="track-header">
          <span className="track-badge">🍽️ SWEETLY</span>

          <h1>Track Your Order</h1>

          <p>Follow your order from the kitchen to your doorstep.</p>
        </div>

        <div className="track-order-card">
          <div className="track-order-top">
            <div>
              <span>Order ID</span>
              <h2>#{orderId}</h2>
            </div>

            <span className="confirmed-badge">Confirmed</span>
          </div>

          <div className="progress-line">
            <div className="track-item completed">
              <div className="track-icon">✓</div>

              <div>
                <h3>Order Confirmed</h3>
                <p>Your order has been confirmed.</p>
              </div>
            </div>

            <div className="track-item active">
              <div className="track-icon">👨‍🍳</div>

              <div>
                <h3>Preparing Your Food</h3>
                <p>Our chefs are preparing your delicious meal.</p>
              </div>
            </div>

            <div className="track-item">
              <div className="track-icon">🛵</div>

              <div>
                <h3>Out for Delivery</h3>
                <p>Your order will be delivered soon.</p>
              </div>
            </div>

            <div className="track-item">
              <div className="track-icon">🏠</div>

              <div>
                <h3>Delivered</h3>
                <p>Enjoy your meal!</p>
              </div>
            </div>
          </div>

          <div className="delivery-box">
            <div className="delivery-icon">🛵</div>

            <div>
              <h3>Estimated Delivery</h3>
              <strong>30 - 45 minutes</strong>
              <p>We will notify you when your order is on the way.</p>
            </div>
          </div>
        </div>

        <div className="track-actions">
          <Link to="/menu">Order More Food</Link>

          <Link to="/">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

export default TrackOrder;
