import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdClose,
  MdShoppingCart,
  MdAdd,
  MdRemove,
  MdDelete,
} from "react-icons/md";

const CartModal = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onExpandCart,
}) => {
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = React.useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    // Cleanup function
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Helper to parse price string (e.g., "₹599") to number
  const parsePrice = (price) => {
    if (typeof price === "number") return price;
    if (!price) return 0;
    // Remove currency symbol and commas, then parse
    return parseFloat(String(price).replace(/[^\d.]/g, "")) || 0;
  };

  const total = cartItems.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.quantity,
    0
  );

  const handleProceedToCheckout = () => {
    setIsCheckingOut(true);

    // Simulate checkout process with animation
    setTimeout(() => {
      onClose(); // Close the modal
      navigate("/checkout"); // Navigate to checkout page
      setIsCheckingOut(false); // Reset state after navigation
    }, 2000); // 5 second loading animation
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-scale-in transform">
        {/* Header with gradient background */}
        <div
          className="flex items-center justify-between p-6 border-b border-gray-100 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(224, 99, 99, 0.05) 0%, rgba(224, 99, 216, 0.05) 100%)",
          }}
        >
          <h2
            className="text-2xl font-bold flex items-center gap-3 animate-slide-in-right"
            style={{ color: "rgba(79,79,79,0.66)" }}
          >
            <div className="relative">
              <MdShoppingCart
                style={{ color: "rgba(224, 99, 99, 0.85)", fontSize: "2rem" }}
              />
              {cartItems.length > 0 && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-bounce">
                  {cartItems.length}
                </div>
              )}
            </div>
            Your Sweet Selection
          </h2>

          {/* Legend for egg preferences */}
          {cartItems.length > 0 && (
            <div className="flex items-center gap-4 mr-4">
              <div className="flex items-center gap-1 text-xs">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span style={{ color: "rgba(79,79,79,0.7)" }}>Egg</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span style={{ color: "rgba(79,79,79,0.7)" }}>Eggless</span>
              </div>
            </div>
          )}

          <button
            onClick={onClose}
            className="p-2 rounded-full transition-all duration-300 hover:bg-gray-100 transform hover:scale-110"
            style={{ color: "rgba(79,79,79,0.7)" }}
          >
            <MdClose />
          </button>
        </div>

        {/* Cart Items with custom scrollbar */}
        <div className="max-h-96 overflow-y-auto p-6 custom-scrollbar">
          {cartItems.length === 0 ? (
            <div className="text-center py-12 animate-fade-in">
              <div className="relative mb-6">
                <MdShoppingCart
                  className="mx-auto animate-bounce-slow"
                  style={{ fontSize: "5rem", color: "rgba(224, 99, 99, 0.3)" }}
                />
                <div className="absolute inset-0 animate-pulse">
                  <MdShoppingCart
                    className="mx-auto animate-bounce"
                    style={{
                      fontSize: "5rem",
                      color: "rgba(224, 99, 99, 0.1)",
                    }}
                  />
                </div>
              </div>
              <p
                className="text-xl mb-3 font-semibold animate-bounce-in-up"
                style={{ color: "rgba(79,79,79,0.66)" }}
              >
                Your cart feels lonely
              </p>
              <p
                className="text-lg italic animate-fade-in-up-delayed"
                style={{ color: "rgba(79,79,79,0.7)" }}
              >
                "Add some sweetness to brighten your day"
              </p>
              <div className="mt-6 flex justify-center">
                <div
                  className="h-1 w-24 rounded-full animate-gradient-x"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, rgba(224, 99, 99, 0.85), rgba(224, 99, 216, 0.85))",
                    backgroundSize: "200% 100%",
                    backgroundPosition: "0% 50%",
                  }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div
                  key={item.key}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] animate-slide-in-up group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={item.imageURL}
                      alt={item.name}
                      className="w-16 h-16 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {/* Egg preference indicator */}
                    <div className="absolute top-1 right-1">
                      <div
                        className={`w-3 h-3 rounded-full border border-white shadow-sm ${
                          item.eggOption === "Egg"
                            ? "bg-red-500"
                            : "bg-green-500"
                        }`}
                      ></div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h4
                      className="font-bold text-lg group-hover:text-opacity-80 transition-all duration-300"
                      style={{ color: "rgba(79,79,79,0.66)" }}
                    >
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <p
                        className="text-sm"
                        style={{ color: "rgba(79,79,79,0.7)" }}
                      >
                        ₹{parsePrice(item.price)} each
                        {item.selectedWeight
                          ? ` (${item.selectedWeight} kg)`
                          : ""}
                      </p>
                      {/* Egg preference text with colored dot */}
                      <div className="flex items-center gap-1">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            item.eggOption === "Egg"
                              ? "bg-red-500"
                              : "bg-green-500"
                          }`}
                        ></div>
                        <span
                          className="text-xs"
                          style={{ color: "rgba(79,79,79,0.6)" }}
                        >
                          {item.eggOption}
                        </span>
                      </div>
                    </div>
                    {/* Message on cake if present */}
                    {item.messageOnCake && (
                      <p
                        className="text-xs italic mt-1"
                        style={{ color: "rgba(79,79,79,0.6)" }}
                      >
                        Message: "{item.messageOnCake}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 bg-white rounded-full p-1 shadow-inner">
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.key, item.quantity - 1)
                      }
                      className="rounded-full p-2 transition-all duration-300 transform hover:scale-110 active:scale-95"
                      style={{
                        backgroundColor: "rgba(224, 99, 99, 0.85)",
                        color: "white",
                      }}
                    >
                      <MdRemove fontSize="small" />
                    </button>
                    <span
                      className="font-bold text-lg min-w-[2.5rem] text-center animate-number-change"
                      style={{ color: "rgba(79,79,79,0.66)" }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.key, item.quantity + 1)
                      }
                      className="rounded-full p-2 transition-all duration-300 transform hover:scale-110 active:scale-95"
                      style={{
                        backgroundColor: "rgba(224, 99, 99, 0.85)",
                        color: "white",
                      }}
                    >
                      <MdAdd fontSize="small" />
                    </button>
                  </div>

                  <div className="text-right">
                    <p
                      className="font-bold text-lg animate-price-change"
                      style={{ color: "rgba(224, 99, 99, 0.85)" }}
                    >
                      ₹{parsePrice(item.price) * item.quantity}
                    </p>
                    <button
                      onClick={() => onRemoveItem(item.key)}
                      className="text-red-500 hover:text-red-700 transition-all duration-300 mt-1 p-1 rounded-full hover:bg-red-50 transform hover:scale-110"
                    >
                      <MdDelete fontSize="small" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with enhanced styling */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-100 p-6 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between mb-4">
              <span
                className="text-xl font-bold"
                style={{ color: "rgba(79,79,79,0.66)" }}
              >
                Total:
              </span>
              <span
                className="text-2xl font-bold animate-total-change"
                style={{ color: "rgba(224, 99, 99, 0.85)" }}
              >
                ₹{total}
              </span>
            </div>
            <p
              className="text-sm italic text-center mb-4"
              style={{ color: "rgba(79,79,79,0.7)" }}
            >
              "Sweet moments await your confirmation"
            </p>

            {!isCheckingOut ? (
              <button
                onClick={handleProceedToCheckout}
                className="w-full text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 relative overflow-hidden group"
                style={{ backgroundColor: "rgba(224, 99, 99, 0.85)" }}
              >
                <span className="relative z-10">Proceed to Sweet Checkout</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>
            ) : (
              <div className="relative w-full">
                <button
                  disabled
                  className="w-full text-white font-bold py-3 px-6 rounded-full relative overflow-hidden"
                  style={{ backgroundColor: "rgba(224, 99, 99, 0.85)" }}
                >
                  <div className="flex items-center justify-center space-x-3">
                    {/* Animated checkout icons */}
                    <div className="flex items-center space-x-2">
                      <MdShoppingCart
                        className="animate-checkout-slide"
                        style={{
                          animation: "checkoutSlide 2s ease-in-out infinite",
                        }}
                      />
                      <div className="flex space-x-1">
                        <div
                          className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: "0s" }}
                        ></div>
                        <div
                          className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                      <div
                        className="text-2xl animate-checkout-process"
                        style={{
                          animation: "checkoutProcess 2s ease-in-out infinite",
                        }}
                      >
                        💳
                      </div>
                    </div>
                    <span className="animate-pulse">
                      Processing your sweet order...
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-b-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-b-full"
                      style={{
                        animation: "progressFill 5s linear forwards",
                      }}
                    ></div>
                  </div>
                </button>

                {/* Custom CSS animations */}
                <style jsx>{`
                  @keyframes checkoutSlide {
                    0%,
                    100% {
                      transform: translateX(0px);
                    }
                    25% {
                      transform: translateX(10px);
                    }
                    50% {
                      transform: translateX(20px);
                    }
                    75% {
                      transform: translateX(10px);
                    }
                  }

                  @keyframes checkoutProcess {
                    0%,
                    100% {
                      transform: scale(1) rotate(0deg);
                      opacity: 1;
                    }
                    25% {
                      transform: scale(1.1) rotate(5deg);
                      opacity: 0.8;
                    }
                    50% {
                      transform: scale(1.2) rotate(-5deg);
                      opacity: 0.9;
                    }
                    75% {
                      transform: scale(1.1) rotate(3deg);
                      opacity: 0.8;
                    }
                  }

                  @keyframes progressFill {
                    0% {
                      width: 0%;
                    }
                    100% {
                      width: 100%;
                    }
                  }

                  @keyframes pulse {
                    0%,
                    100% {
                      opacity: 1;
                    }
                    50% {
                      opacity: 0.7;
                    }
                  }
                `}</style>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
