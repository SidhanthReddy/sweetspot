import React, { useState, useEffect } from "react";
import { X, Star, Heart, ShoppingCart, Plus, Minus } from "lucide-react";
import { useWishlist } from "../components/WishlistContext"; // Import useWishlist
import { useCart } from "../components/CartContext"; // Assuming you have a CartContext
import { useToast } from "../components/CustomToast"; // Import useToast

const CakeModal = ({ cake, isOpen, onClose }) => {
  const { cartItems, addToCart, updateQuantity } = useCart();

  const [selectedWeight, setSelectedWeight] = useState(1);
  const [eggOption, setEggOption] = useState("Egg");
  const [messageOnCake, setMessageOnCake] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const { toggleWishlist, isInWishlist } = useWishlist(); // Use the wishlist context
  const showToast = useToast(); // Use the toast hook

  const isWishlisted = isInWishlist(cake?.id); // Determine if current cake is wishlisted

  useEffect(() => {
    // Reset state when modal opens for a new cake
    if (isOpen && cake) {
      setSelectedWeight(cake.availableWeights[0] || 1);
      setEggOption(cake.eggOptions[0] || "Egg");
      setMessageOnCake("");
      setQuantity(0);
    }
  }, [isOpen, cake]);

  useEffect(() => {
    if (cake) {
      setSelectedWeight(1);
      setEggOption("Egg");
      setMessageOnCake("");
    }
  }, [cake]);

  // Update quantity when cart items, weight, egg option, or message changes
  useEffect(() => {
    if (cake) {
      const key = `${cake.id}_${selectedWeight}_${eggOption}_${messageOnCake}`;
      const existingItem = cartItems.find((item) => item.key === key);
      setQuantity(existingItem ? existingItem.quantity : 0);
    }
  }, [cake, cartItems, selectedWeight, eggOption, messageOnCake]);

  if (!isOpen || !cake) return null;

  const key = `${cake.id}_${selectedWeight}_${eggOption}_${messageOnCake}`;
  const existingCartItem = cartItems.find((item) => item.key === key);

  const handleAddToCart = () => {
    setIsAnimating(true);

    setTimeout(() => {
      const itemToAdd = {
        ...cake,
        selectedWeight,
        eggOption,
        messageOnCake,
        quantity: 1,
        price: cake.price * selectedWeight,
        key,
      };

      addToCart(itemToAdd);
      setQuantity(1);
      showToast.success(`🎂 Added ${cake.name} to Cart!`);
      setIsAnimating(false);
    }, 800); // Animation duration
  };

  const handleWishlist = (e) => {
    e.stopPropagation(); // Prevent modal close if this button is part of a larger clickable area
    toggleWishlist(cake);
    if (!isWishlisted) {
      showToast.info("❤️ Added to Wishlist");
    } else {
      showToast.info("💔 Removed from Wishlist");
    }
  };

  const adjustQuantity = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 0) {
      setQuantity(newQuantity);
      updateQuantity(key, newQuantity);
      if (newQuantity > 0) {
        showToast.success(`🛒 Updated quantity for ${cake.name}!`);
      }
    }
  };

  // Calculate price for display
  const displayPrice = cake.price * selectedWeight;
  const totalPrice = cake.price * selectedWeight * Math.max(quantity, 1);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] flex flex-col">
        {/* Header - Fixed at top */}
        <div className="flex-shrink-0 bg-white border-b border-gray-100 p-4 sm:p-6 flex items-center justify-between rounded-t-2xl">
          <h2
            className="text-2xl sm:text-3xl font-bold font-parastoo"
            style={{ color: "rgba(79,79,79,0.7)" }}
          >
            Cake Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-50 rounded-full transition-colors"
            style={{ color: "rgba(79,79,79,0.7)" }}
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Column - Image */}
            <div className="space-y-3 sm:space-y-4">
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={cake.imageURL}
                  alt={cake.name}
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                />
                <button
                  onClick={handleWishlist}
                  className={`absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-3 rounded-full shadow-lg transition-all ${
                    isWishlisted ? "bg-red-50" : "bg-white"
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 sm:h-5 sm:w-5 ${
                      isWishlisted ? "fill-current" : ""
                    }`}
                    style={{ color: "rgba(224, 99, 99, 0.85)" }}
                  />
                </button>
              </div>

              {/* Additional Images */}
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg overflow-hidden bg-gray-100"
                  >
                    <img
                      src={cake.imageURL}
                      alt={`${cake.name} view ${index}`}
                      className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-4 sm:space-y-6">
              {/* Title and Rating */}
              <div>
                <h1
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold font-parastoo mb-2 sm:mb-3"
                  style={{ color: "rgba(79,79,79,0.66)" }}
                >
                  {cake.name}
                </h1>
                <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 sm:h-5 sm:w-5 ${
                          i < cake.rating ? "fill-current" : ""
                        }`}
                        style={{ color: "rgba(224, 99, 99, 0.85)" }}
                      />
                    ))}
                  </div>
                  <span
                    className="font-parastoo text-sm sm:text-base"
                    style={{ color: "rgba(79,79,79,0.7)" }}
                  >
                    ({cake.rating}/5)
                  </span>
                </div>
                <p
                  className="text-lg sm:text-xl italic font-parastoo"
                  style={{ color: "rgba(79,79,79,0.7)" }}
                >
                  "Every slice tells a story of sweetness"
                </p>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3">
                <span
                  className="text-3xl sm:text-4xl font-bold font-parastoo"
                  style={{ color: "rgba(224, 99, 99, 0.85)" }}
                >
                  ₹{quantity > 0 ? totalPrice : displayPrice}
                </span>
                {cake.originalPrice && (
                  <span
                    className="text-lg sm:text-xl line-through font-parastoo"
                    style={{ color: "rgba(79,79,79,0.5)" }}
                  >
                    ₹
                    {cake.originalPrice *
                      selectedWeight *
                      Math.max(quantity, 1)}
                  </span>
                )}
                <span
                  className="text-xs sm:text-sm font-parastoo px-2 sm:px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: "rgba(224, 99, 99, 0.1)",
                    color: "rgba(224, 99, 99, 0.85)",
                  }}
                >
                  {cake.deliveryTime}
                </span>
              </div>

              {/* Description */}
              <div>
                <p
                  className="font-parastoo leading-relaxed text-sm sm:text-base"
                  style={{ color: "rgba(79,79,79,0.7)" }}
                >
                  {cake.description}
                </p>
              </div>

              {/* Weight Selection */}
              <div>
                <h3
                  className="text-lg sm:text-xl font-semibold font-parastoo mb-2 sm:mb-3"
                  style={{ color: "rgba(79,79,79,0.7)" }}
                >
                  Select Weight
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                  {cake.availableWeights.map((weight) => (
                    <button
                      key={weight}
                      onClick={() => setSelectedWeight(weight)}
                      className={`p-2 sm:p-3 rounded-lg border-2 font-parastoo transition-all text-sm sm:text-base ${
                        selectedWeight === weight
                          ? "border-current shadow-sm"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      style={{
                        borderColor:
                          selectedWeight === weight
                            ? "rgba(224, 99, 99, 0.85)"
                            : undefined,
                        backgroundColor:
                          selectedWeight === weight
                            ? "rgba(224, 99, 99, 0.1)"
                            : undefined,
                        color:
                          selectedWeight === weight
                            ? "rgba(224, 99, 99, 0.85)"
                            : "rgba(79,79,79,0.7)",
                      }}
                    >
                      {weight} kg
                    </button>
                  ))}
                </div>
              </div>

              {/* Egg Option */}
              <div>
                <h3
                  className="text-lg sm:text-xl font-semibold font-parastoo mb-2 sm:mb-3"
                  style={{ color: "rgba(79,79,79,0.7)" }}
                >
                  Egg Preference
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-4">
                  {cake.eggOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setEggOption(option)}
                      className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg border-2 font-parastoo transition-all text-sm sm:text-base ${
                        eggOption === option
                          ? "border-current shadow-sm"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      style={{
                        borderColor:
                          eggOption === option
                            ? "rgba(224, 99, 99, 0.85)"
                            : undefined,
                        backgroundColor:
                          eggOption === option
                            ? "rgba(224, 99, 99, 0.1)"
                            : undefined,
                        color:
                          eggOption === option
                            ? "rgba(224, 99, 99, 0.85)"
                            : "rgba(79,79,79,0.7)",
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message on Cake */}
              <div>
                <h3
                  className="text-lg sm:text-xl font-semibold font-parastoo mb-2 sm:mb-3"
                  style={{ color: "rgba(79,79,79,0.7)" }}
                >
                  Message on Cake (Optional)
                </h3>
                <textarea
                  value={messageOnCake}
                  onChange={(e) => setMessageOnCake(e.target.value)}
                  placeholder="Add a personal message to make it special..."
                  className="w-full p-3 sm:p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-transparent font-parastoo resize-none text-sm sm:text-base"
                  rows="3"
                  maxLength="50"
                />
                <p
                  className="text-xs sm:text-sm mt-1 font-parastoo"
                  style={{ color: "rgba(79,79,79,0.5)" }}
                >
                  {messageOnCake.length}/50 characters
                </p>
              </div>

              {/* Add to Cart or Quantity Control */}
              <div className="flex flex-col space-y-3 sm:space-y-4">
                {quantity === 0 && !isAnimating ? (
                  // Add to Cart Button (when quantity is 0)
                  <button
                    onClick={handleAddToCart}
                    className="flex items-center justify-center space-x-2 sm:space-x-3 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-200 hover:shadow-lg font-parastoo text-base sm:text-lg font-semibold w-full overflow-hidden"
                    style={{ backgroundColor: "rgba(224, 99, 99, 0.85)" }}
                  >
                    <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>Add to Cart - ₹{displayPrice}</span>
                  </button>
                ) : isAnimating ? (
                  // Animating button
                  <div className="relative w-full">
                    <button
                      disabled
                      className="flex items-center justify-center space-x-2 sm:space-x-3 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-parastoo text-base sm:text-lg font-semibold w-full overflow-hidden"
                      style={{ backgroundColor: "rgba(224, 99, 99, 0.85)" }}
                    >
                      <div className="relative w-full flex items-center justify-center">
                        <ShoppingCart
                          className="h-4 w-4 sm:h-5 sm:w-5 absolute transition-all duration-800 ease-in-out"
                          style={{
                            transform: "translateX(0px)",
                            animation: "slideRight 0.8s ease-in-out forwards",
                          }}
                        />
                        <span className="opacity-80">Adding to Cart...</span>
                      </div>
                    </button>
                    <style jsx>{`
                      @keyframes slideRight {
                        0% {
                          transform: translateX(-20px);
                          opacity: 1;
                        }
                        50% {
                          transform: translateX(40px);
                          opacity: 0.5;
                        }
                        100% {
                          transform: translateX(100px);
                          opacity: 0;
                        }
                      }
                    `}</style>
                  </div>
                ) : (
                  // Quantity Control (when quantity > 0)
                  <div
                    className="flex items-center justify-center space-x-4 animate-fadeIn"
                    style={{
                      animation: "fadeIn 0.5s ease-in-out",
                    }}
                  >
                    <button
                      onClick={() => adjustQuantity(-1)}
                      className="p-3 rounded-lg border-2 hover:bg-gray-50 transition-colors"
                      style={{
                        borderColor: "rgba(224, 99, 99, 0.85)",
                        color: "rgba(224, 99, 99, 0.85)",
                      }}
                    >
                      <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                    <span
                      className="px-6 py-3 font-parastoo text-xl font-semibold min-w-[80px] text-center rounded-lg"
                      style={{
                        backgroundColor: "rgba(224, 99, 99, 0.1)",
                        color: "rgba(224, 99, 99, 0.85)",
                      }}
                    >
                      {quantity}
                    </span>
                    <button
                      onClick={() => adjustQuantity(1)}
                      className="p-3 rounded-lg border-2 hover:bg-gray-50 transition-colors"
                      style={{
                        borderColor: "rgba(224, 99, 99, 0.85)",
                        color: "rgba(224, 99, 99, 0.85)",
                      }}
                    >
                      <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                    <style jsx>{`
                      @keyframes fadeIn {
                        0% {
                          opacity: 0;
                          transform: translateY(10px);
                        }
                        100% {
                          opacity: 1;
                          transform: translateY(0);
                        }
                      }
                    `}</style>
                  </div>
                )}
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4 pt-3 sm:pt-4 border-t border-gray-100">
                <div className="text-center">
                  <p
                    className="text-xs sm:text-sm font-parastoo font-semibold"
                    style={{ color: "rgba(224, 99, 99, 0.85)" }}
                  >
                    Free Delivery
                  </p>
                  <p
                    className="text-xs font-parastoo"
                    style={{ color: "rgba(79,79,79,0.5)" }}
                  >
                    On orders above ₹500
                  </p>
                </div>
                <div className="text-center">
                  <p
                    className="text-xs sm:text-sm font-parastoo font-semibold"
                    style={{ color: "rgba(224, 99, 99, 0.85)" }}
                  >
                    Same Day Delivery
                  </p>
                  <p
                    className="text-xs font-parastoo"
                    style={{ color: "rgba(79,79,79,0.5)" }}
                  >
                    Order before 6 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CakeModal;
