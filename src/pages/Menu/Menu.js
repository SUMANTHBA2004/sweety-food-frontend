import React, { useState } from "react";
import FoodCard from "../../components/FoodCard/FoodCard";
import "./Menu.css";

function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const menuItems = [
    // =========================
    // 🍕 PIZZA
    // =========================

    {
      id: 1,
      name: "Margherita Pizza",
      category: "Pizza",
      price: 299,
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 2,
      name: "Farmhouse Pizza",
      category: "Pizza",
      price: 349,
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 3,
      name: "Paneer Tikka Pizza",
      category: "Pizza",
      price: 379,
      image:
        "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 4,
      name: "Veggie Supreme Pizza",
      category: "Pizza",
      price: 399,
      image:
        "https://images.unsplash.com/photo-1593560708920-61dd98c8cfd3?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 5,
      name: "Cheese Burst Pizza",
      category: "Pizza",
      price: 429,
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 6,
      name: "Corn & Cheese Pizza",
      category: "Pizza",
      price: 329,
      image:
        "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 7,
      name: "Mexican Green Wave Pizza",
      category: "Pizza",
      price: 379,
      image:
        "https://images.unsplash.com/photo-1593560708920-61dd98c8cfd3?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 8,
      name: "Double Cheese Pizza",
      category: "Pizza",
      price: 399,
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 9,
      name: "Spicy Paneer Pizza",
      category: "Pizza",
      price: 389,
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 10,
      name: "Italian Veg Pizza",
      category: "Pizza",
      price: 359,
      image:
        "https://images.unsplash.com/photo-1593560708920-61dd98c8cfd3?auto=format&fit=crop&w=900&q=85",
    },

    // =========================
    // 🍔 BURGERS
    // =========================

    {
      id: 11,
      name: "Classic Veg Burger",
      category: "Burger",
      price: 149,
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 12,
      name: "Cheese Burger",
      category: "Burger",
      price: 179,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 13,
      name: "Paneer Burger",
      category: "Burger",
      price: 199,
      image:
        "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 14,
      name: "Double Cheese Burger",
      category: "Burger",
      price: 229,
      image:
        "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 15,
      name: "Crispy Veg Burger",
      category: "Burger",
      price: 169,
      image:
        "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 16,
      name: "Spicy Mexican Burger",
      category: "Burger",
      price: 219,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 17,
      name: "Mushroom Burger",
      category: "Burger",
      price: 189,
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 18,
      name: "Peri Peri Burger",
      category: "Burger",
      price: 209,
      image:
        "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 19,
      name: "Supreme Veg Burger",
      category: "Burger",
      price: 249,
      image:
        "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 20,
      name: "Loaded Cheese Burger",
      category: "Burger",
      price: 259,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",
    },

    // =========================
    // 🍝 PASTA
    // =========================

    {
      id: 21,
      name: "Creamy Alfredo Pasta",
      category: "Pasta",
      price: 249,
      image:
        "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 22,
      name: "Arrabbiata Pasta",
      category: "Pasta",
      price: 229,
      image:
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 23,
      name: "Penne Pasta",
      category: "Pasta",
      price: 219,
      image:
        "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 24,
      name: "Cheese Pasta",
      category: "Pasta",
      price: 259,
      image:
        "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 25,
      name: "White Sauce Pasta",
      category: "Pasta",
      price: 239,
      image:
        "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 26,
      name: "Red Sauce Pasta",
      category: "Pasta",
      price: 219,
      image:
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 27,
      name: "Veggie Pasta",
      category: "Pasta",
      price: 229,
      image:
        "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 28,
      name: "Spicy Pasta",
      category: "Pasta",
      price: 249,
      image:
        "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 29,
      name: "Pesto Pasta",
      category: "Pasta",
      price: 279,
      image:
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 30,
      name: "Italian Special Pasta",
      category: "Pasta",
      price: 299,
      image:
        "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=900&q=85",
    },

    // =========================
    // 🍗 MAIN COURSE
    // =========================

    {
      id: 31,
      name: "Veg Biryani",
      category: "Main Course",
      price: 199,
      image:
        "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 32,
      name: "Chicken Biryani",
      category: "Main Course",
      price: 249,
      image:
        "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 33,
      name: "Paneer Butter Masala",
      category: "Main Course",
      price: 229,
      image:
        "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 34,
      name: "Dal Tadka",
      category: "Main Course",
      price: 179,
      image:
        "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 35,
      name: "Veg Fried Rice",
      category: "Main Course",
      price: 189,
      image:
        "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 36,
      name: "Paneer Fried Rice",
      category: "Main Course",
      price: 219,
      image:
        "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 37,
      name: "Veg Thali",
      category: "Main Course",
      price: 249,
      image:
        "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 38,
      name: "Paneer Tikka Masala",
      category: "Main Course",
      price: 239,
      image:
        "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 39,
      name: "Jeera Rice",
      category: "Main Course",
      price: 159,
      image:
        "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 40,
      name: "Special Veg Meal",
      category: "Main Course",
      price: 279,
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85",
    },

    // =========================
    // 🍟 SNACKS
    // =========================

    {
      id: 41,
      name: "French Fries",
      category: "Snacks",
      price: 119,
      image:
        "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 42,
      name: "Cheese Fries",
      category: "Snacks",
      price: 159,
      image:
        "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 43,
      name: "Veg Nuggets",
      category: "Snacks",
      price: 139,
      image:
        "https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 44,
      name: "Garlic Bread",
      category: "Snacks",
      price: 149,
      image:
        "https://images.unsplash.com/photo-1619535860434-cf9b902aee90?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 45,
      name: "Cheese Balls",
      category: "Snacks",
      price: 169,
      image:
        "https://images.unsplash.com/photo-1548340748-6d2b7d7da280?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 46,
      name: "Onion Rings",
      category: "Snacks",
      price: 129,
      image:
        "https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 47,
      name: "Peri Peri Fries",
      category: "Snacks",
      price: 139,
      image:
        "https://images.unsplash.com/photo-1598679253544-2c97992403ea?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 48,
      name: "Veg Spring Rolls",
      category: "Snacks",
      price: 159,
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 49,
      name: "Crispy Corn",
      category: "Snacks",
      price: 149,
      image:
        "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 50,
      name: "Masala Wedges",
      category: "Snacks",
      price: 139,
      image:
        "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85",
    },

    // =========================
    // 🍰 DESSERTS
    // =========================

    {
      id: 51,
      name: "Chocolate Cake",
      category: "Desserts",
      price: 199,
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 52,
      name: "Red Velvet Cake",
      category: "Desserts",
      price: 229,
      image:
        "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 53,
      name: "Chocolate Brownie",
      category: "Desserts",
      price: 149,
      image:
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 54,
      name: "Vanilla Cake",
      category: "Desserts",
      price: 179,
      image:
        "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 55,
      name: "Cheesecake",
      category: "Desserts",
      price: 249,
      image:
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 56,
      name: "Chocolate Mousse",
      category: "Desserts",
      price: 169,
      image:
        "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 57,
      name: "Ice Cream Sundae",
      category: "Desserts",
      price: 159,
      image:
        "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 58,
      name: "Gulab Jamun",
      category: "Desserts",
      price: 129,
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 59,
      name: "Brownie With Ice Cream",
      category: "Desserts",
      price: 219,
      image:
        "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 60,
      name: "Fruit Cream",
      category: "Desserts",
      price: 149,
      image:
        "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=85",
    },

    // =========================
    // 🥤 BEVERAGES
    // =========================

    {
      id: 61,
      name: "Fresh Lime Soda",
      category: "Beverages",
      price: 89,
      image:
        "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 62,
      name: "Cold Coffee",
      category: "Beverages",
      price: 129,
      image:
        "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 63,
      name: "Chocolate Shake",
      category: "Beverages",
      price: 159,
      image:
        "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 64,
      name: "Mango Shake",
      category: "Beverages",
      price: 149,
      image:
        "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 65,
      name: "Strawberry Shake",
      category: "Beverages",
      price: 159,
      image:
        "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 66,
      name: "Fresh Orange Juice",
      category: "Beverages",
      price: 119,
      image:
        "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 67,
      name: "Watermelon Juice",
      category: "Beverages",
      price: 109,
      image:
        "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 68,
      name: "Mojito",
      category: "Beverages",
      price: 139,
      image:
        "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 69,
      name: "Iced Tea",
      category: "Beverages",
      price: 99,
      image:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 70,
      name: "Classic Milkshake",
      category: "Beverages",
      price: 149,
      image:
        "https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=900&q=85",
    },
  ];

  const categories = [
    "All",
    "Pizza",
    "Burger",
    "Pasta",
    "Main Course",
    "Snacks",
    "Desserts",
    "Beverages",
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;

    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="menu-page">
      {/* ================= HEADER ================= */}

      <section className="menu-header">
        <span className="menu-label">SWEETLY FOOD</span>

        <h1>
          Explore Our <span>Menu</span>
        </h1>

        <p>Delicious food prepared fresh and delivered with love.</p>
      </section>

      {/* ================= SEARCH ================= */}

      <div className="menu-search">
        <input
          type="text"
          placeholder="Search your favourite food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <span>🔍</span>
      </div>

      {/* ================= CATEGORIES ================= */}

      <div className="category-container">
        {categories.map((category) => (
          <button
            key={category}
            className={
              activeCategory === category
                ? "category-btn active"
                : "category-btn"
            }
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* ================= FOOD COUNT ================= */}

      <div className="menu-result">
        <p>
          Showing <strong>{filteredItems.length}</strong> food items
        </p>
      </div>

      {/* ================= FOOD GRID ================= */}

      <div className="menu-grid">
        {filteredItems.map((item) => (
          <FoodCard
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>

      {/* ================= EMPTY RESULT ================= */}

      {filteredItems.length === 0 && (
        <div className="no-food">
          <div>🍽️</div>

          <h2>No food found</h2>

          <p>Try searching for another dish.</p>
        </div>
      )}
    </div>
  );
}

export default Menu;
