import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./DemoPayment.css";

function DemoPayment() {
  const navigate = useNavigate();
  const location = useLocation();

  const orderData = location.state?.order;

  const [paymentType, setPaymentType] = useState("UPI");
  const [processing, setProcessing] = useState(false);

  if (!orderData) {
    return (
      <main className="demo-payment-page">
        <div className="demo-payment-card">
          <div className="payment-error-icon">!</div>

          <h1>Payment Session Expired</h1>

          <p>Please return to checkout and try again.</p>

          <button onClick={() => navigate("/checkout")}>
            Back to Checkout
          </button>
        </div>
      </main>
    );
  }

  const handlePayment = () => {
    setProcessing(true);

    setTimeout(() => {
      const paymentId =
        "DEMO-PAY-" + Math.floor(100000 + Math.random() * 900000);

      const updatedOrder = {
        ...orderData,
        paymentMethod: "ONLINE",
        paymentStatus: "PAID",
        demoPaymentId: paymentId,
        orderStatus: "PLACED",
        paidAt: new Date().toISOString(),
      };

      localStorage.setItem("latestOrder", JSON.stringify(updatedOrder));

      const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

      const orders = Array.isArray(existingOrders) ? existingOrders : [];

      orders.push(updatedOrder);

      localStorage.setItem("orders", JSON.stringify(orders));

      localStorage.removeItem("cart");

      navigate("/order-success", {
        state: {
          order: updatedOrder,
          paymentSuccess: true,
        },
      });
    }, 1800);
  };

  return (
    <main className="demo-payment-page">
      <div className="demo-payment-wrapper">
        <div className="demo-payment-header">
          <span>DEMO PAYMENT</span>

          <h1>Complete Payment</h1>

          <p>This is a safe demo transaction. No real money will be charged.</p>
        </div>

        <div className="demo-payment-card">
          <div className="payment-brand">
            <div className="brand-logo">🍽️</div>

            <div>
              <strong>Sweetly Food</strong>
              <span>Secure Checkout</span>
            </div>
          </div>

          <div className="payment-amount">
            <span>Total Amount</span>

            <strong>₹{Number(orderData.totalAmount).toFixed(2)}</strong>
          </div>

          <div className="payment-order-info">
            <span>Order ID</span>

            <strong>{orderData.orderId}</strong>
          </div>

          <div className="payment-method-title">Choose Payment Method</div>

          <div className="demo-payment-methods">
            <button
              type="button"
              className={paymentType === "UPI" ? "active" : ""}
              onClick={() => setPaymentType("UPI")}
            >
              <span>📱</span>

              <div>
                <strong>Demo UPI</strong>
                <small>Google Pay / PhonePe / UPI</small>
              </div>

              <b>{paymentType === "UPI" ? "✓" : ""}</b>
            </button>

            <button
              type="button"
              className={paymentType === "CARD" ? "active" : ""}
              onClick={() => setPaymentType("CARD")}
            >
              <span>💳</span>

              <div>
                <strong>Demo Card</strong>
                <small>Credit / Debit Card</small>
              </div>

              <b>{paymentType === "CARD" ? "✓" : ""}</b>
            </button>

            <button
              type="button"
              className={paymentType === "WALLET" ? "active" : ""}
              onClick={() => setPaymentType("WALLET")}
            >
              <span>👛</span>

              <div>
                <strong>Demo Wallet</strong>
                <small>Sweetly Wallet</small>
              </div>

              <b>{paymentType === "WALLET" ? "✓" : ""}</b>
            </button>
          </div>

          {paymentType === "UPI" && (
            <div className="demo-input-box">
              <label>Demo UPI ID</label>

              <input type="text" value="customer@demo" readOnly />
            </div>
          )}

          {paymentType === "CARD" && (
            <div className="demo-card-fields">
              <div>
                <label>Card Number</label>

                <input type="text" value="4111 1111 1111 1111" readOnly />
              </div>

              <div className="card-small-fields">
                <div>
                  <label>Expiry</label>

                  <input value="12/30" readOnly />
                </div>

                <div>
                  <label>CVV</label>

                  <input value="123" readOnly />
                </div>
              </div>
            </div>
          )}

          {paymentType === "WALLET" && (
            <div className="demo-wallet-message">
              💰 Demo wallet balance is sufficient for this transaction.
            </div>
          )}

          <button
            className="demo-pay-button"
            onClick={handlePayment}
            disabled={processing}
          >
            {processing
              ? "Processing Payment..."
              : `Pay ₹${Number(orderData.totalAmount).toFixed(2)}`}
          </button>

          <div className="demo-security">
            🔒 Demo transaction • No real money charged
          </div>
        </div>
      </div>
    </main>
  );
}

export default DemoPayment;
