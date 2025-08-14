import React, { useEffect, useState } from "react";
import {
  MdCheckCircle,
  MdClose,
  MdLocalOffer,
  MdSavings,
} from "react-icons/md";

const SavingsPopup = ({ isOpen, onClose, savings, itemName }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Auto close after 4 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div
        className={`bg-white rounded-3xl shadow-2xl max-w-md w-full transform transition-all duration-300 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Header with gradient */}
        <div
          className="relative overflow-hidden rounded-t-3xl p-6 text-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(224, 99, 99, 0.1) 0%, rgba(224, 99, 216, 0.1) 100%)",
          }}
        >
          {/* Animated success icon */}
          <div className="relative mb-4">
            <div className="absolute inset-0 animate-ping">
              <MdCheckCircle
                className="mx-auto"
                style={{ fontSize: "4rem", color: "rgba(224, 99, 99, 0.3)" }}
              />
            </div>
            <MdCheckCircle
              className="mx-auto relative z-10 animate-bounce"
              style={{ fontSize: "4rem", color: "rgba(224, 99, 99, 0.85)" }}
            />
          </div>

          <h2
            className="text-3xl font-bold mb-2"
            style={{ color: "rgba(79,79,79,0.66)" }}
          >
            🎉 You Saved!
          </h2>

          <div className="flex items-center justify-center gap-2 mb-3">
            <MdSavings
              style={{ color: "rgba(224, 99, 99, 0.85)", fontSize: "1.5rem" }}
            />
            <span
              className="text-4xl font-bold animate-pulse"
              style={{ color: "rgba(224, 99, 99, 0.85)" }}
            >
              ₹{savings}
            </span>
          </div>

          <p
            className="text-lg italic mb-2"
            style={{ color: "rgba(79,79,79,0.7)" }}
          >
            "Sweet deals for sweet moments!"
          </p>

          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full transition-all duration-300 hover:bg-gray-100 transform hover:scale-110"
            style={{ color: "rgba(79,79,79,0.7)" }}
          >
            <MdClose />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 pt-0">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 mb-4 border border-green-100">
            <div className="flex items-center gap-3 mb-2">
              <MdLocalOffer style={{ color: "rgba(224, 99, 99, 0.85)" }} />
              <span
                className="font-semibold"
                style={{ color: "rgba(79,79,79,0.66)" }}
              >
                Special Cake Bundle Offer
              </span>
            </div>
            <p className="text-sm" style={{ color: "rgba(79,79,79,0.7)" }}>
              <strong>{itemName}</strong> added at exclusive discounted price!
            </p>
          </div>

          <div className="text-center">
            <p className="text-lg mb-4" style={{ color: "rgba(79,79,79,0.7)" }}>
              You're making your celebration even more special while saving
              money!
            </p>

            <div className="flex items-center justify-center gap-2 mb-4">
              <div
                className="h-1 w-8 rounded-full animate-pulse"
                style={{ backgroundColor: "rgba(224, 99, 99, 0.85)" }}
              ></div>
              <span
                className="text-sm italic"
                style={{ color: "rgba(79,79,79,0.7)" }}
              >
                exclusive for cake customers
              </span>
              <div
                className="h-1 w-8 rounded-full animate-pulse"
                style={{ backgroundColor: "rgba(224, 99, 99, 0.85)" }}
              ></div>
            </div>

            <button
              onClick={handleClose}
              className="w-full text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden group"
              style={{ backgroundColor: "rgba(224, 99, 99, 0.85)" }}
            >
              <span className="relative z-10">Continue Shopping</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsPopup;
