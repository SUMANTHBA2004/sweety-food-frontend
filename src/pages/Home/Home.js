import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import FoodCard from "../../components/FoodCard/FoodCard";
import sumanthImage from "../../assets/images/sumanth.jpg";

import "./Home.css";

const fallbackFoods = [
  {
    id: 1,
    name: "Chicken Biryani",
    price: 180,
    imageUrl:
      "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Cheese Burger",
    price: 149,
    imageUrl:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Margherita Pizza",
    price: 199,
    imageUrl:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Chocolate Cake",
    price: 129,
    imageUrl:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
  },
];

const categories = [
  {
    name: "Pizza",
    description: "Fresh & cheesy",
    emoji: "🍕",
    color: "orange",
  },
  {
    name: "Burgers",
    description: "Loaded & delicious",
    emoji: "🍔",
    color: "pink",
  },
  {
    name: "Biryani",
    description: "Rich & flavourful",
    emoji: "🍗",
    color: "yellow",
  },
  {
    name: "Desserts",
    description: "Sweet happiness",
    emoji: "🍰",
    color: "purple",
  },
  {
    name: "Chinese",
    description: "Hot & tasty",
    emoji: "🍜",
    color: "green",
  },
  {
    name: "Drinks",
    description: "Cool & refreshing",
    emoji: "🥤",
    color: "blue",
  },
];

function Home() {
  const [popularFoods, setPopularFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    const fetchPopularFoods = async () => {
      try {
        setLoading(true);
        setApiError(false);

        const response = await fetch("http://localhost:8081/api/foods");

        if (!response.ok) {
          throw new Error("Unable to load foods");
        }

        const data = await response.json();

        /*
         * Supports either:
         * 1. API returning an array
         * 2. API returning { foods: [...] }
         */

        const foods = Array.isArray(data)
          ? data
          : Array.isArray(data.foods)
            ? data.foods
            : [];

        setPopularFoods(foods);
      } catch (error) {
        console.error("Food loading error:", error);

        /*
         * We use fallback data only during development.
         * The real application should eventually depend
         * completely on the Spring Boot API.
         */

        setPopularFoods(fallbackFoods);
        setApiError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularFoods();
  }, []);

  return (
    <div className="home">
      {/* =====================================================
          HERO SECTION
      ====================================================== */}

      <section className="hero-section">
        <div className="hero-background-shape hero-shape-one" />
        <div className="hero-background-shape hero-shape-two" />
        <div className="hero-background-shape hero-shape-three" />

        <div className="hero-container">
          {/* LEFT SIDE */}

          <div className="hero-content">
            <div className="welcome-badge">
              <span className="badge-icon">🍕</span>
              <span>WELCOME TO SWEETLY</span>
            </div>

            <h1>
              Taste the
              <span> happiness.</span>
            </h1>

            <p className="hero-description">
              Fresh, delicious and carefully prepared food, delivered straight
              to your doorstep.
            </p>

            <div className="hero-buttons">
              <Link to="/menu" className="primary-button">
                Explore Menu
                <span>→</span>
              </Link>

              <Link to="/menu" className="secondary-button">
                Discover More
              </Link>
            </div>

            {/* HERO TRUST */}

            <div className="hero-trust">
              <div className="trust-avatars">
                <div className="avatar avatar-one">👨</div>

                <div className="avatar avatar-two">👩</div>

                <div className="avatar avatar-three">👨</div>

                <div className="avatar avatar-more">+</div>
              </div>

              <div className="trust-text">
                <div className="trust-rating">⭐⭐⭐⭐⭐</div>

                <span>Loved by 10,000+ customers</span>
              </div>
            </div>

            {/* HERO STATS */}

            <div className="hero-stats">
              <div className="hero-stat">
                <strong>10K+</strong>

                <span>Happy Customers</span>
              </div>

              <div className="stat-divider" />

              <div className="hero-stat">
                <strong>500+</strong>

                <span>Food Items</span>
              </div>

              <div className="stat-divider" />

              <div className="hero-stat">
                <strong>4.9</strong>

                <span>Customer Rating</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}

          <div className="hero-visual">
            <div className="hero-glow" />

            <div className="founder-card">
              <div className="founder-image-wrapper">
                <img
                  src={sumanthImage}
                  alt="Sweetly Food founder"
                  className="founder-image"
                />

                <div className="floating-food floating-burger">🍔</div>

                <div className="floating-food floating-pizza">🍕</div>

                <div className="floating-food floating-heart">❤️</div>
              </div>

              <div className="founder-info">
                <span className="founder-label">FOUNDER & OWNER</span>

                <h3>Sumanth B A</h3>

                <p>Sweetly Food & Restaurant</p>

                <div className="founder-rating">
                  <span>⭐</span>

                  <strong>4.9</strong>

                  <small>Customer Rating</small>
                </div>
              </div>
            </div>

            {/* DELIVERY FLOAT CARD */}

            <div className="delivery-card">
              <div className="delivery-icon">🚀</div>

              <div>
                <strong>Fast Delivery</strong>

                <span>25–40 mins</span>
              </div>

              <div className="delivery-status">●</div>
            </div>

            {/* ORDER FLOAT CARD */}

            <div className="order-floating-card">
              <div className="mini-food-image">🍗</div>

              <div>
                <strong>Chicken Biryani</strong>

                <span>Fresh & hot</span>
              </div>

              <strong className="mini-price">₹180</strong>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUICK FEATURES
      ====================================================== */}

      <section className="quick-features">
        <div className="section-container">
          <div className="quick-feature">
            <div className="quick-feature-icon">🚀</div>

            <div>
              <h3>Fast Delivery</h3>

              <p>Hot food at your doorstep</p>
            </div>
          </div>

          <div className="quick-feature">
            <div className="quick-feature-icon">🥗</div>

            <div>
              <h3>Fresh Ingredients</h3>

              <p>Quality ingredients every day</p>
            </div>
          </div>

          <div className="quick-feature">
            <div className="quick-feature-icon">👨‍🍳</div>

            <div>
              <h3>Expert Chefs</h3>

              <p>Prepared with care</p>
            </div>
          </div>

          <div className="quick-feature">
            <div className="quick-feature-icon">🔒</div>

            <div>
              <h3>Secure Ordering</h3>

              <p>Safe & reliable checkout</p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CATEGORIES
      ====================================================== */}

      <section className="categories-section">
        <div className="section-container">
          <div className="section-heading">
            <span className="section-kicker">EXPLORE OUR MENU</span>

            <h2>What are you craving?</h2>

            <p>
              Pick your favourite category and discover something delicious.
            </p>
          </div>

          <div className="categories-grid">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/menu?category=${encodeURIComponent(category.name)}`}
                className="category-link"
              >
                <div className={`category-card ${category.color}`}>
                  <div className="category-icon">{category.emoji}</div>

                  <div className="category-content">
                    <h3>{category.name}</h3>

                    <p>{category.description}</p>
                  </div>

                  <span className="category-arrow">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          POPULAR FOOD
      ====================================================== */}

      <section className="popular-section">
        <div className="section-container">
          <div className="popular-heading">
            <div>
              <span className="section-kicker">CUSTOMER FAVOURITES</span>

              <h2>Popular dishes</h2>

              <p>The dishes our customers keep coming back for.</p>
            </div>

            <Link to="/menu" className="view-menu-link">
              View Full Menu
              <span>→</span>
            </Link>
          </div>

          {loading ? (
            <div className="food-loading">
              <div className="loading-spinner" />

              <p>Finding something delicious...</p>
            </div>
          ) : (
            <>
              {apiError && (
                <div className="development-notice">
                  <span>ℹ️</span>

                  <p>
                    Restaurant API is currently unavailable. Showing sample
                    dishes for development.
                  </p>
                </div>
              )}

              {popularFoods.length === 0 ? (
                <div className="empty-food-state">
                  <div>🍽️</div>

                  <h3>No dishes available</h3>

                  <p>Please check back soon for delicious food.</p>

                  <Link to="/menu" className="primary-button">
                    Explore Menu
                  </Link>
                </div>
              ) : (
                <div className="food-grid">
                  {popularFoods.slice(0, 4).map((food) => (
                    <FoodCard
                      key={food.id}
                      id={food.id}
                      name={food.name}
                      price={food.price}
                      image={food.imageUrl || food.image}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS
      ====================================================== */}

      <section className="how-section">
        <div className="section-container">
          <div className="section-heading">
            <span className="section-kicker">SIMPLE & EASY</span>

            <h2>Order food in 3 easy steps</h2>

            <p>From craving to doorstep in just a few clicks.</p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>

              <div className="step-icon">🔍</div>

              <h3>Choose your food</h3>

              <p>Explore our menu and select your favourite dishes.</p>
            </div>

            <div className="step-connector">→</div>

            <div className="step-card">
              <div className="step-number">02</div>

              <div className="step-icon">🛒</div>

              <h3>Add to cart</h3>

              <p>Select your quantity and review your delicious order.</p>
            </div>

            <div className="step-connector">→</div>

            <div className="step-card">
              <div className="step-number">03</div>

              <div className="step-icon">🚴</div>

              <h3>Enjoy your meal</h3>

              <p>Place your order and enjoy fresh food at your doorstep.</p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          TRUST SECTION
      ====================================================== */}

      <section className="trust-section">
        <div className="section-container">
          <div className="trust-content">
            <div className="trust-text-content">
              <span className="section-kicker">WHY PEOPLE LOVE US</span>

              <h2>
                More than food.
                <span>It's happiness.</span>
              </h2>

              <p>
                At Sweetly, we believe every meal should be fresh, delicious and
                memorable. From the kitchen to your doorstep, we focus on
                quality at every step.
              </p>

              <div className="trust-points">
                <div>
                  <span>✓</span>
                  <p>Freshly prepared food</p>
                </div>

                <div>
                  <span>✓</span>
                  <p>Carefully selected ingredients</p>
                </div>

                <div>
                  <span>✓</span>
                  <p>Reliable delivery experience</p>
                </div>

                <div>
                  <span>✓</span>
                  <p>Customer-first service</p>
                </div>
              </div>

              <Link to="/menu" className="primary-button">
                Start Ordering
                <span>→</span>
              </Link>
            </div>

            <div className="trust-visual">
              <div className="trust-main-card">
                <div className="trust-big-emoji">🍽️</div>

                <strong>4.9</strong>

                <span>Average Customer Rating</span>

                <div className="stars">★★★★★</div>
              </div>

              <div className="trust-small-card trust-small-one">
                <strong>10K+</strong>

                <span>Happy customers</span>
              </div>

              <div className="trust-small-card trust-small-two">
                <strong>500+</strong>

                <span>Delicious dishes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="cta-section">
        <div className="cta-background-circle cta-circle-one" />
        <div className="cta-background-circle cta-circle-two" />

        <div className="cta-container">
          <div className="cta-content">
            <span>🍴 READY TO ORDER?</span>

            <h2>
              Your next delicious
              <br />
              meal is waiting.
            </h2>

            <p>Discover delicious food and bring happiness to your table.</p>
          </div>

          <Link to="/menu" className="cta-button">
            Order Now
            <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
