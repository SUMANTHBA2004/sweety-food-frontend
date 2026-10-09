import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const stats = [
    {
      title: "Total Orders",
      value: "View Orders",
      icon: "🛍️",
      color: "orange",
      link: "/admin/orders",
    },
    {
      title: "Today's Sales",
      value: "View Sales",
      icon: "💰",
      color: "green",
      link: "/admin/orders",
    },
    {
      title: "Food Items",
      value: "Manage Food",
      icon: "🍔",
      color: "blue",
      link: "/admin/food",
    },
    {
      title: "Categories",
      value: "Manage Categories",
      icon: "📂",
      color: "purple",
      link: "/admin/categories",
    },
  ];

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div>
          <span className="dashboard-label">SWEETLY FOOD</span>
          <h1>Admin Dashboard</h1>
          <p>Manage your restaurant from one place.</p>
        </div>

        <Link to="/" className="dashboard-home-btn">
          🏠 Visit Website
        </Link>
      </header>

      <section className="dashboard-welcome">
        <div>
          <h2>Welcome, Admin! 👋</h2>
          <p>
            Manage food items, customer orders, categories, and your restaurant
            operations.
          </p>
        </div>

        <div className="dashboard-welcome-icon">🍕</div>
      </section>

      <section className="dashboard-stats">
        {stats.map((stat) => (
          <Link to={stat.link} className="dashboard-stat-card" key={stat.title}>
            <div className={`dashboard-stat-icon ${stat.color}`}>
              {stat.icon}
            </div>

            <h3>{stat.title}</h3>

            <p>{stat.value}</p>

            <span className="dashboard-card-link">Open section →</span>
          </Link>
        ))}
      </section>

      <section className="dashboard-section">
        <h2>Restaurant Management</h2>
        <p className="dashboard-section-description">
          Choose an option to manage your restaurant.
        </p>

        <div className="dashboard-management-grid">
          <Link to="/admin/food" className="management-card">
            <span>🍔</span>
            <h3>Manage Food</h3>
            <p>Add, edit, and manage food products.</p>
            <strong>Manage Food →</strong>
          </Link>

          <Link to="/admin/categories" className="management-card">
            <span>🗂️</span>
            <h3>Manage Categories</h3>
            <p>Organize pizzas, burgers, snacks, and more.</p>
            <strong>Manage Categories →</strong>
          </Link>

          <Link to="/admin/orders" className="management-card">
            <span>📦</span>
            <h3>Manage Orders</h3>
            <p>Review orders and manage their status.</p>
            <strong>Manage Orders →</strong>
          </Link>

          <Link to="/admin/customers" className="management-card">
            <span>👥</span>
            <h3>Manage Customers</h3>
            <p>View and manage customer information.</p>
            <strong>Manage Customers →</strong>
          </Link>
        </div>
      </section>

      <footer className="dashboard-footer">
        <p>🍕 Sweetly Food Admin Panel</p>
        <span>Restaurant Management System</span>
      </footer>
    </div>
  );
}

export default Dashboard;
