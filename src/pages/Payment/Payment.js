import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useCart } from "../../context/CartContext";

import "./Payment.css";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const { clearCart } = useCart();

  const { customer, total, cart } = location.state || {};

  const [method, setMethod] = useState("UPI");

  const [upiId, setUpiId] = useState("");

  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const [loading, setLoading] = useState(false);

  if (!customer || !cart) {
    return (
      <div className="payment-page">
        <div className="payment-card">
          <h2>Payment session expired</h2>

          <p>Please go back to checkout and try again.</p>

          <button onClick={() => navigate("/checkout")}>
            Back to Checkout
          </button>
        </div>
      </div>
    );
  }

  const createOrder = async () => {
    const orderData = {
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,

      address: customer.address,
      city: customer.city,
      pincode: customer.pincode,

      totalAmount: total,

      items: cart.map((item) => ({
        foodId: item.id,
        foodName: item.name,
        price: Number(item.price),
        quantity: Number(item.quantity || 1),
      })),
    };

    const response = await fetch("http://localhost:8081/api/orders", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("Order creation failed");
    }

    const savedOrder = await response.json();

    const completeOrder = {
      ...savedOrder,

      orderId: savedOrder.orderId || savedOrder.id || "ORD" + Date.now(),

      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
      },

      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,

      address: customer.address,
      city: customer.city,
      pincode: customer.pincode,

      total: Number(savedOrder.totalAmount ?? total),

      paymentMethod:
        method === "UPI"
          ? "UPI"
          : method === "CARD"
            ? "Credit / Debit Card"
            : "Net Banking",

      paymentStatus: "Paid",

      status: "Order Placed",

      orderDate: new Date().toISOString(),

      items: cart,
    };

    localStorage.setItem("latestOrder", JSON.stringify(completeOrder));

    localStorage.setItem("sweetlyLatestOrder", JSON.stringify(completeOrder));

    const oldOrders = JSON.parse(localStorage.getItem("sweetlyOrders") || "[]");

    localStorage.setItem(
      "sweetlyOrders",
      JSON.stringify([completeOrder, ...oldOrders]),
    );

    clearCart();

    navigate("/order-success", {
      state: {
        order: completeOrder,
      },
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (method === "UPI") {
      if (!upiId.trim()) {
        alert("Please enter your UPI ID.");
        return;
      }
    }

    if (method === "CARD") {
      if (!card.number || !card.expiry || !card.cvv || !card.name) {
        alert("Please enter all card details.");

        return;
      }
    }

    try {
      setLoading(true);

      /*
        DEMO PAYMENT

        This is a frontend simulation.
        For real money transactions,
        integrate Razorpay/Stripe/etc.
      */

      await new Promise((resolve) => setTimeout(resolve, 1200));

      await createOrder();
    } catch (error) {
      console.error(error);

      alert(
        "Payment completed but order creation failed. Please check your backend.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <div className="payment-card">
          <div className="payment-header">
            <span>🔒 SECURE CHECKOUT</span>

            <h1>Complete Payment</h1>

            <p>Choose your preferred payment method.</p>
          </div>

          <div className="payment-tabs">
            <button
              type="button"
              className={method === "UPI" ? "active" : ""}
              onClick={() => setMethod("UPI")}
            >
              📱 UPI
            </button>

            <button
              type="button"
              className={method === "CARD" ? "active" : ""}
              onClick={() => setMethod("CARD")}
            >
              💳 Card
            </button>

            <button
              type="button"
              className={method === "NETBANKING" ? "active" : ""}
              onClick={() => setMethod("NETBANKING")}
            >
              🏦 Net Banking
            </button>
          </div>

          <form onSubmit={handlePayment}>
            {method === "UPI" && (
              <div className="payment-form">
                <label>UPI ID</label>

                <input
                  type="text"
                  placeholder="example@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />

                <div className="upi-apps">
                  <span>Google Pay</span>
                  <span>PhonePe</span>
                  <span>Paytm</span>
                </div>
              </div>
            )}

            {method === "CARD" && (
              <div className="payment-form">
                <label>Card Holder Name</label>

                <input
                  type="text"
                  placeholder="Name on card"
                  value={card.name}
                  onChange={(e) =>
                    setCard({
                      ...card,
                      name: e.target.value,
                    })
                  }
                />

                <label>Card Number</label>

                <input
                  type="text"
                  maxLength="16"
                  placeholder="1234 5678 9012 3456"
                  value={card.number}
                  onChange={(e) =>
                    setCard({
                      ...card,
                      number: e.target.value,
                    })
                  }
                />

                <div className="card-row">
                  <div>
                    <label>Expiry</label>

                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={card.expiry}
                      onChange={(e) =>
                        setCard({
                          ...card,
                          expiry: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label>CVV</label>

                    <input
                      type="password"
                      maxLength="3"
                      placeholder="123"
                      value={card.cvv}
                      onChange={(e) =>
                        setCard({
                          ...card,
                          cvv: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {method === "NETBANKING" && (
              <div className="payment-form">
                <label>Select Bank</label>

                <select defaultValue="">
                  <option value="" disabled>
                    Select your bank
                  </option>

                  <option>State Bank of India</option>

                  <option>HDFC Bank</option>

                  <option>ICICI Bank</option>

                  <option>Axis Bank</option>

                  <option>Kotak Mahindra Bank</option>
                </select>
              </div>
            )}

            <div className="payment-total">
              <span>Amount to Pay</span>

              <strong>₹{total}</strong>
            </div>

            <button type="submit" className="pay-button" disabled={loading}>
              {loading ? "Processing Payment..." : `Pay ₹${total} Securely →`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;
