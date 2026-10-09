import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const phone = formData.phone.trim();
    const password = formData.password.trim();
    const address = formData.address.trim();

    if (!name) {
      setError("Please enter your name");
      return;
    }

    if (!email) {
      setError("Please enter your email");
      return;
    }

    if (!phone) {
      setError("Please enter your phone number");
      return;
    }

    if (!password) {
      setError("Please enter your password");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8081/api/customers/register",
        {
          name,
          email,
          phone,
          password,
          address,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("REGISTER SUCCESS:", response.data);

      const customer = response.data;

      if (!customer || !customer.id) {
        setError("Registration succeeded, but Customer ID was not returned.");
        return;
      }

      // Save customer information
      localStorage.setItem("customerId", String(customer.id));
      localStorage.setItem("customerName", customer.name || name);
      localStorage.setItem("customerEmail", customer.email || email);
      localStorage.setItem("customerPhone", customer.phone || phone);
      localStorage.setItem("isLoggedIn", "true");

      console.log("Customer ID saved:", customer.id);

      alert("Registration successful!\nCustomer ID: " + customer.id);

      // Go to checkout after registration
      navigate("/checkout");
    } catch (error) {
      console.error("REGISTER ERROR:", error);

      if (error.response) {
        console.error("STATUS:", error.response.status);
        console.error("SERVER RESPONSE:", error.response.data);

        if (error.response.status === 409) {
          const serverMessage =
            typeof error.response.data === "string"
              ? error.response.data
              : error.response.data?.message;

          setError(
            serverMessage || "This email is already registered. Please login.",
          );
        } else if (error.response.status === 400) {
          setError("Invalid registration data. Please check all fields.");
        } else if (error.response.status === 500) {
          setError("Server error. Please check the Spring Boot console.");
        } else {
          setError(`Registration failed (${error.response.status})`);
        }
      } else {
        setError(
          "Cannot connect to Spring Boot server. Make sure backend is running on port 8081.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <h1>Create Account 🍕</h1>

        <p className="subtitle">Register to order delicious food</p>

        <form onSubmit={handleRegister}>
          <label>Full Name</label>

          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
          />

          <label>Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
          />

          <label>Phone Number</label>

          <input
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
            disabled={loading}
          />

          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Create password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
          />

          <label>Delivery Address</label>

          <textarea
            name="address"
            placeholder="Enter delivery address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            disabled={loading}
          />

          {error && <div className="register-error">{error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="login-text">
          Already have an account?
          <span onClick={() => navigate("/login")}> Login</span>
        </p>
      </div>
    </div>
  );
}

export default Register;
