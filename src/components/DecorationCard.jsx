import React from "react";
import { ShoppingCart, Heart, Star } from "lucide-react";

const DecorationCard = ({
  cake,
  onCardClick,
  onAddToCart,
  isInCart,
  cartItem,
  onUpdateQuantity,
  className = "", // Add className prop for height control
}) => {
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Adding to cart:", cake.name);
    if (onAddToCart && typeof onAddToCart === "function") {
      onAddToCart(cake);
    }
  };

  const handleCardClick = (e) => {
    // Only trigger card click if we're not clicking on interactive elements
    if (e.target.closest("button")) {
      return;
    }
    console.log("DecorationCard clicked:", cake.name);
    if (onCardClick && typeof onCardClick === "function") {
      onCardClick(cake);
    }
  };

  const handleQuantityDecrease = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Decreasing quantity for:", cake.name);
    if (
      onUpdateQuantity &&
      typeof onUpdateQuantity === "function" &&
      cartItem
    ) {
      const newQuantity = cartItem.quantity - 1;
      if (newQuantity > 0) {
        onUpdateQuantity(cartItem.key, newQuantity);
      } else {
        // Optional: Remove item from cart when quantity reaches 0
        onUpdateQuantity(cartItem.key, 0);
      }
    }
  };

  const handleQuantityIncrease = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Increasing quantity for:", cake.name);
    if (
      onUpdateQuantity &&
      typeof onUpdateQuantity === "function" &&
      cartItem
    ) {
      onUpdateQuantity(cartItem.key, cartItem.quantity + 1);
    }
  }; 

  return (
    <div
      className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100 cursor-pointer flex flex-col ${className}`}
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden flex-shrink-0">
        <img
          src={cake.imageURL}
          alt={cake.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Overlay with heart icon */}
        <div
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("Heart clicked for:", cake.name);
              // Add your heart/wishlist functionality here
            }}
          >
            <Heart
              className="h-4 w-4 transition-colors hover:opacity-80"
              style={{ color: "rgba(224, 99, 99, 0.85)" }}
            />
          </button>
        </div>

        {/* Delivery time badge */}
        <div className="absolute bottom-3 left-3">
          <span className="text-white text-xs px-3 py-1 rounded-full font-parastoo bg-black bg-opacity-50">
            {cake.deliveryTime}
          </span>
        </div>

        {/* Badge for special tags */}
        {cake.tags && cake.tags.includes("sugarFree") && (
          <div className="absolute top-3 left-3">
            <span
              className="text-white text-xs px-3 py-1 rounded-full font-parastoo"
              style={{ backgroundColor: "rgba(220, 117, 186, 0.92)" }}
            >
              Sugar Free
            </span>
          </div>
        )}

        {cake.tags && cake.tags.includes("healthy") && (
          <div className="absolute top-3 left-3">
            <span
              className="text-white text-xs px-3 py-1 rounded-full font-parastoo"
              style={{ backgroundColor: "rgba(215, 135, 157, 1)" }}
            >
              Healthy
            </span>
          </div>
        )}
      </div>

      {/* Content - This will grow to fill remaining space */}
      <div className="p-5 flex flex-col flex-grow">
        <h3
          className="font-semibold text-lg font-parastoo mb-2 line-clamp-2 flex-shrink-0"
          style={{ color: "rgba(79,79,79,0.7)" }}
        >
          {cake.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-2 flex-shrink-0">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => {
              const starValue = i + 1;
              const rating = cake.rating || 0;
              
              // Calculate how much of this star should be filled (0 to 1)
              let fillPercentage = 0;
              if (rating >= starValue) {
                fillPercentage = 1; // Completely filled
              } else if (rating > starValue - 1) {
                fillPercentage = rating - (starValue - 1); // Partially filled
              }
              
              if (fillPercentage === 0) {
                // Empty star
                return (
                  <Star
                    key={i}
                    className="h-4 w-4"
                    style={{ color: "rgba(224, 99, 99, 0.85)" }}
                  />
                );
              } else if (fillPercentage === 1) {
                // Completely filled star
                return (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-current"
                    style={{ color: "rgba(224, 99, 99, 0.85)" }}
                  />
                );
              } else {
                // Partially filled star
                return (
                  <div key={i} className="relative">
                    <Star
                      className="h-4 w-4"
                      style={{ color: "rgba(224, 99, 99, 0.85)" }}
                    />
                    <div 
                      className="absolute inset-0 overflow-hidden"
                      style={{ width: `${fillPercentage * 100}%` }}
                    >
                      <Star
                        className="h-4 w-4 fill-current"
                        style={{ color: "rgba(224, 99, 99, 0.85)" }}
                      />
                    </div>
                  </div>
                );
              }
            })}
          </div>
          {cake.rating && (
            <span
              className="text-sm font-parastoo"
              style={{ color: "rgba(79,79,79,0.5)" }}
            >
              ({cake.rating.toFixed(1)})
            </span>
          )}
        </div>

        {/* Description - This will grow to fill available space */}
        <p
          className="text-sm mb-4 line-clamp-3 font-parastoo flex-grow"
          style={{ color: "rgba(79,79,79,0.7)" }}
        >
          {cake.description}
        </p>

        {/* Price and Add to Cart - Fixed at bottom */}
        <div className="flex items-center justify-between mb-3 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <span
              className="text-xl font-bold font-parastoo"
              style={{ color: "rgba(224, 99, 99, 0.85)" }}
            >
              ₹{cake.price}
            </span>
            {cake.originalPrice && (
              <span
                className="text-sm line-through font-parastoo"
                style={{ color: "rgba(79,79,79,0.5)" }}
              >
                ₹{cake.originalPrice}
              </span>
            )}
          </div>

          {!isInCart ? (
            <button
              type="button"
              onClick={handleAddToCart}
              className="text-white font-parastoo py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                backgroundColor: "rgba(224, 99, 99, 0.85)",
                focusRingColor: "rgba(224, 99, 99, 0.5)",
              }}
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center space-x-3 bg-gray-50 rounded-full p-1">
              <button
                type="button"
                onClick={handleQuantityDecrease}
                className="text-white rounded-full p-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50"
                style={{
                  backgroundColor: "rgba(224, 99, 99, 0.85)",
                  focusRingColor: "rgba(224, 99, 99, 0.5)",
                }}
                disabled={!cartItem || cartItem.quantity <= 0}
              >
                -
              </button>
              <span
                className="font-bold text-lg min-w-[2rem] text-center"
                style={{ color: "rgba(79,79,79,0.66)" }}
              >
                {cartItem ? cartItem.quantity : 0}
              </span>
              <button
                type="button"
                onClick={handleQuantityIncrease}
                className="text-white rounded-full p-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  backgroundColor: "rgba(224, 99, 99, 0.85)",
                  focusRingColor: "rgba(224, 99, 99, 0.5)",
                }}
              >
                +
              </button>
            </div>
          )}
        </div>

        {/* Additional info - Fixed at bottom */}
        <div
          className="flex items-center justify-between text-xs font-parastoo flex-shrink-0"
          style={{ color: "rgba(79,79,79,0.5)" }}
        >
          <span>✓ Fresh baked</span>
        </div>
      </div>
    </div>
  );
};

export default DecorationCard;