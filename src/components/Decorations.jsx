import React, { useState, useEffect } from "react";
import DecorationCard from "./DecorationCard";
import { decorationItems } from "../data/decoration.js";
import SavingsPopup from "./SavingsPopup";
import { useCart } from "./CartContext.jsx";
import { motion, AnimatePresence } from "framer-motion";

const Decorations = ({ onDecorationAdd }) => {
  const { cartItems, addToCart, updateQuantity } = useCart();
  const [popupData, setPopupData] = useState({
    isOpen: false,
    savings: 0,
    itemName: "",
  });
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Calculate items per row based on screen size
  const getItemsPerRow = () => {
    if (isMobile) return 1; // Show 1 item per row on mobile
    return 3; // Show 3 items per row on desktop
  };

  const itemsPerRow = getItemsPerRow();
  const visibleItems = showAll
    ? decorationItems
    : decorationItems.slice(0, itemsPerRow);

  const handleAddToCart = (item) => {
    // Create unique ID for decorations to avoid conflicts with cake IDs
    const uniqueDecorationId = `decoration_${item.id}`;
    const cartItem = cartItems.find((ci) => ci.id === uniqueDecorationId);
    const itemWithDecorationFlag = {
      ...item,
      id: uniqueDecorationId, // Use unique ID
      originalDecorationId: item.id, // Keep original for reference
      isDecoration: true,
      category: "decoration",
      // Map decoration properties to expected format
      imageURL: item.image,
      price: item.discountedPrice,
      originalPrice: item.originalPrice,
    };

    if (cartItem) {
      updateQuantity(uniqueDecorationId, cartItem.quantity + 1);
    } else {
      addToCart({ ...itemWithDecorationFlag, quantity: 1 });
    }
    if (onDecorationAdd) {
      onDecorationAdd(itemWithDecorationFlag);
    }
    setPopupData({ isOpen: true, savings: item.savings, itemName: item.name });
  };

  const handleUpdateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      updateQuantity(itemId, 0);
    } else {
      updateQuantity(itemId, quantity);
    }
  };

  const handleClosePopup = () => {
    setPopupData({ isOpen: false, savings: 0, itemName: "" });
  };

  const handleViewMore = () => {
    setShowAll(true);
  };

  const handleViewLess = () => {
    setShowAll(false);
  };

  return (
    <div className="w-full">
      <h3
        className="text-xl sm:text-2xl font-bold mb-4 px-2 sm:px-0"
        style={{ color: "rgba(79,79,79,0.66)" }}
      >
        Decorations
      </h3>

      {/* Mobile: Single column, Desktop: Grid with equal heights */}
      <div
        className={`
        ${
          isMobile
            ? "flex flex-col space-y-4 px-2"
            : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        }
      `}
      >
        <AnimatePresence>
          {visibleItems.map((item, index) => {
            const uniqueDecorationId = `decoration_${item.id}`;
            const cartItem = cartItems.find(
              (ci) => ci.id === uniqueDecorationId
            );

            const itemWithImageURL = {
              ...item,
              id: uniqueDecorationId, // Use unique ID for cart operations
              originalDecorationId: item.id, // Keep original for reference
              imageURL: item.image,
              price: item.discountedPrice,
              originalPrice: item.originalPrice,
              description: item.description,
              name: item.name,
              tags: [],
              isDecoration: true,
              category: "decoration",
            };

            return (
              <motion.div
                key={item.id} // Use original ID for React key
                initial={{
                  opacity: 0,
                  scale: isMobile ? 1 : 0.9,
                  y: isMobile ? 20 : 30,
                }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  scale: isMobile ? 1 : 0.9,
                  y: isMobile ? -20 : -30,
                }}
                transition={{
                  delay: showAll
                    ? index >= itemsPerRow
                      ? (index - itemsPerRow) * (isMobile ? 0.1 : 0.05)
                      : 0
                    : index * (isMobile ? 0.1 : 0.05),
                  duration: isMobile ? 0.3 : 0.4,
                  ease: "easeOut",
                }}
                className={`w-full ${!isMobile ? 'flex' : ''}`}
              >
                <DecorationCard
                  cake={itemWithImageURL} // Pass the item with unique ID
                  cartItem={cartItem}
                  isInCart={!!cartItem && cartItem.quantity > 0}
                  onAddToCart={() => handleAddToCart(item)} // Pass original item to maintain savings etc.
                  onUpdateQuantity={(itemKey, quantity) => {
                    handleUpdateQuantity(itemKey, quantity);
                  }}
                  // Add className prop to ensure full height
                  className={!isMobile ? 'h-full flex-1' : ''}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* View More/Less Button */}
      {decorationItems.length > itemsPerRow && (
        <div className="flex justify-center mt-6 px-2 sm:px-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={showAll ? handleViewLess : handleViewMore}
            className="px-6 py-3 bg-[rgba(224,99,99,0.85)] text-white font-semibold rounded-lg shadow-lg transition-colors duration-200"
          >
            {showAll
              ? "View Less"
              : `View More (${decorationItems.length - itemsPerRow} more)`}
          </motion.button>
        </div>
      )}

      <SavingsPopup
        isOpen={popupData.isOpen}
        onClose={handleClosePopup}
        savings={popupData.savings}
        itemName={popupData.itemName}
      />
    </div>
  );
};

export default Decorations;