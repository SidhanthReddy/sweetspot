// src/components/WishlistContext.js
import React, { createContext, useContext, useState, useEffect } from "react"; // Import useEffect

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  // 1. Initialize state by trying to load from localStorage
  // Use a function for useState to ensure it only runs once on initial render
  const [wishlist, setWishlist] = useState(() => {
    try {
      const storedWishlist = localStorage.getItem("wishlist");
      return storedWishlist ? JSON.parse(storedWishlist) : [];
    } catch (error) {
      console.error("Failed to parse wishlist from localStorage:", error);
      return []; // Return empty array if there's an error parsing
    }
  });

  // 2. Save wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } catch (error) {
      console.error("Failed to save wishlist to localStorage:", error);
    }
  }, [wishlist]); // Dependency array: run this effect whenever 'wishlist' changes

  const toggleWishlist = (cake) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.find((item) => item.id === cake.id);
      if (exists) {
        return prevWishlist.filter((item) => item.id !== cake.id);
      } else {
        return [...prevWishlist, cake];
      }
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== id));
  };

  const isInWishlist = (id) => wishlist.some((item) => item.id === id);

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isInWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);