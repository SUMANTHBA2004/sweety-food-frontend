import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");

      if (!savedCart) {
        return [];
      }

      const parsedCart = JSON.parse(savedCart);

      return Array.isArray(parsedCart) ? parsedCart : [];
    } catch (error) {
      console.error("Error loading cart:", error);
      return [];
    }
  });

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add food to cart
  const addToCart = (food) => {
    setCart((previousCart) => {
      const existingItem = previousCart.find((item) => item.id === food.id);

      if (existingItem) {
        return previousCart.map((item) =>
          item.id === food.id
            ? {
                ...item,
                quantity: Math.max(0, Number(item.quantity) || 0) + 1,
              }
            : item,
        );
      }

      return [
        ...previousCart,
        {
          ...food,
          quantity: 1,
        },
      ];
    });
  };

  // Remove food completely
  const removeFromCart = (id) => {
    setCart((previousCart) => previousCart.filter((item) => item.id !== id));
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: (Number(item.quantity) || 0) + 1,
            }
          : item,
      ),
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: (Number(item.quantity) || 0) - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  // Total quantity of all food items
  const cartCount = cart.reduce(
    (total, item) => total + Math.max(0, Number(item.quantity) || 0),
    0,
  );

  // Total price
  const cartTotal = cart.reduce(
    (total, item) =>
      total +
      Math.max(0, Number(item.price) || 0) *
        Math.max(0, Number(item.quantity) || 0),
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};

export default CartContext;
