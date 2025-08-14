// src/context/CartContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react"; // Import useEffect

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart items from localStorage if available
    try {
      const storedCart = localStorage.getItem("cartItems");
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        // Filter out decoration items if any exist initially
        const filteredCart = parsedCart.filter((item) => !item.isDecoration);
        return filteredCart;
      }
      return [];
    } catch (error) {
      console.error("Failed to parse cartItems from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    // Save cart items to localStorage whenever they change
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cartItems to localStorage", error);
    }
  }, [cartItems]);

  const generateCartItemKey = (cake) => {
    return `${cake.id}_${cake.selectedWeight}_${cake.eggOption}_${
      cake.messageOnCake || ""
    }`;
  };

  const addToCart = (cake) => {
    setCartItems((prevItems) => {
      const key = generateCartItemKey(cake);
      const existingItem = prevItems.find((item) => item.key === key);
      if (existingItem) {
        // If item already in cart, increase quantity by 1
        return prevItems.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Add new item with quantity 1 and key
        return [...prevItems, { ...cake, quantity: 1, key }];
      }
    });
  };

  const updateQuantity = (key, quantity) => {
    setCartItems((prevItems) => {
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        return prevItems.filter((item) => item.key !== key);
      } else {
        return prevItems.map((item) =>
          item.key === key ? { ...item, quantity } : item
        );
      }
    });
  };

  const resetCart = () => {
    setCartItems([]);
  };

  const clearDecorations = () => {
    setCartItems((prevItems) => prevItems.filter((item) => !item.isDecoration));
  };

  const cartCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        resetCart,
        clearDecorations,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
