import React from "react";
import { useCart } from "../../context/CartContext";
import "./FoodCard.css";

function FoodCard({ id, name, price, image, category = "Main Course" }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      image,
      category,
    });
  };

  return (
    <article className="food-card">
      <div className="food-image-wrapper">
        <img src={image} alt={name} className="food-image" loading="lazy" />

        <span className="food-category">{category}</span>

        <button
          className="quick-add"
          onClick={handleAddToCart}
          aria-label={`Add ${name} to cart`}
        >
          +
        </button>
      </div>

      <div className="food-card-content">
        <div className="food-rating">
          <span>★</span> 4.8
        </div>

        <h3>{name}</h3>

        <p className="food-description">
          Freshly prepared with quality ingredients.
        </p>

        <div className="food-card-bottom">
          <strong>₹{price}</strong>

          <button className="add-cart-button" onClick={handleAddToCart}>
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default FoodCard;
