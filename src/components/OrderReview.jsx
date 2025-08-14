import { useEffect } from "react";
import { decorationItems } from "../data/decoration.js";
import {
  BadgePercent,
  Truck,
  IndianRupee,
  Calculator,
  Percent,
} from "lucide-react";

// Egg/Eggless Indicator Component
const EggIndicator = ({ eggOption }) => {
  const isEggless =
    eggOption &&
    (eggOption.toLowerCase().includes("eggless") ||
      eggOption.toLowerCase().includes("without egg") ||
      eggOption.toLowerCase() === "no egg");

  return (
    <div className="flex items-center gap-1">
      <div
        className={`w-3 h-3 rounded-full border-2 ${
          isEggless
            ? "bg-green-500 border-green-600"
            : "bg-red-500 border-red-600"
        }`}
      />
      <span
        className={`text-xs font-medium ${
          isEggless ? "text-green-700" : "text-red-700"
        }`}
      >
        {isEggless ? "Eggless" : "Contains Egg"}
      </span>
    </div>
  );
};

export default function OrderReview({ cartItems, onTotalChange }) {
  const discount = 50;
  const shipping = 30;
  const tax = 18;

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const total = subtotal - discount + shipping + tax;

  // ✅ This must be inside the component
  useEffect(() => {
    if (onTotalChange) {
      onTotalChange(total);
    }
  }, [total, onTotalChange]);

  // Build a set of decoration item names for fallback detection
  const decorationNames = new Set(decorationItems.map((d) => d.name));

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-md max-w-4xl mx-auto font-parastoo border border-[rgba(224,99,99,0.2)]">
      {/* Quotation */}
      <p className="italic text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 text-center text-[rgba(224,99,99,0.85)] px-2">
        "Every slice tells a story — savor the sweetness of your moments with
        Sweetspot."
      </p>

      {/* Items list */}
      <div className="space-y-4 sm:space-y-6">
        {cartItems.map((item) => {
          // Fallback: treat as decoration if isDecoration is true OR name matches known decoration
          const isDecoration =
            item.isDecoration || decorationNames.has(item.cakeName);

          if (isDecoration) {
            return (
              <div
                key={item.id || item.cakeId}
                className="relative flex flex-col sm:flex-row gap-4 sm:gap-6 items-center border-2 border-green-200 bg-gradient-to-r from-green-50 to-green-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Bundle Item Badge */}
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-green-500 text-white text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-md select-none tracking-wide">
                  BUNDLE ITEM
                </div>

                {/* Product Image */}
                <div className="relative mt-6 sm:mt-0 mx-auto sm:mx-0 flex-shrink-0">
                  <img
                    src={item.imageURL || item.cakeImage}
                    alt={item.name || item.cakeName}
                    className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 object-cover rounded-xl border-2 border-green-300 shadow-md"
                  />
                  {/* Decorative corner accent */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full shadow-sm"></div>
                </div>

                {/* Product Details - Fixed alignment */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-2">
                    {item.name || item.cakeName}
                  </h3>
                  <p className="italic mb-3 text-green-700 text-sm sm:text-base leading-relaxed">
                    {item.description || item.cakeDescription}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-3">
                    <p className="text-sm sm:text-base text-green-700">
                      Category:{" "}
                      <span className="font-semibold text-green-800 bg-green-200 px-2 py-1 rounded-md text-xs sm:text-sm">
                        Decoration
                      </span>
                    </p>
                  </div>
                  <p className="font-semibold text-green-700 text-sm sm:text-base flex items-center justify-center sm:justify-start gap-2">
                    <span className="bg-green-200 text-green-800 px-2 py-1 rounded-md text-xs sm:text-sm">
                      Qty: {item.quantity}
                    </span>
                  </p>
                </div>

                {/* Price Section */}
                <div className="w-full sm:w-auto text-center bg-white rounded-xl p-3 sm:p-4 border border-green-200 shadow-sm flex-shrink-0">
                  <p className="mb-2 text-green-600 text-xs sm:text-sm font-medium uppercase tracking-wide">
                    Total Price
                  </p>
                  <p className="font-bold text-green-800 text-xl sm:text-2xl">
                    ₹{(item.price * item.quantity).toFixed(0)}
                  </p>
                  {item.originalPrice && (
                    <p className="text-green-600 text-xs sm:text-sm line-through mt-1">
                      ₹{(item.originalPrice * item.quantity).toFixed(0)}
                    </p>
                  )}
                </div>
              </div>
            );
          } else {
            // Regular cake items
            return (
              <div
                key={item.id || item.cakeId}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center border border-[rgba(224,99,99,0.2)] bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <img
                  src={item.imageURL || item.cakeImage}
                  alt={item.name || item.cakeName}
                  className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 object-cover rounded-xl border border-[rgba(224,99,99,0.3)] mx-auto sm:mx-0 flex-shrink-0"
                />
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl font-semibold text-[rgba(79,79,79,0.7)] mb-2">
                    {item.name || item.cakeName}
                  </h3>
                  <p className="italic mb-3 text-[rgba(79,79,79,0.7)] text-sm sm:text-base">
                    {item.description || item.cakeDescription}
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm sm:text-base text-[rgba(79,79,79,0.7)]">
                      Flavour:{" "}
                      <span className="text-[rgba(224,99,99,0.85)] font-semibold">
                        {item.cakeFlavour || "N/A"}
                      </span>
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                      <p className="text-sm sm:text-base text-[rgba(79,79,79,0.7)]">
                        Egg Option:{" "}
                        <span className="text-[rgba(224,99,99,0.85)] font-semibold">
                          {item.cakeEggOptions?.length
                            ? item.cakeEggOptions.join(", ")
                            : item.eggOption || item.selectedEggOption || "Egg"}
                        </span>
                      </p>
                      <EggIndicator
                        eggOption={
                          item.eggOption || item.selectedEggOption || "Egg"
                        }
                      />
                    </div>
                    {item.selectedWeight && (
                      <p className="text-sm sm:text-base text-[rgba(79,79,79,0.7)]">
                        Weight:{" "}
                        <span className="text-[rgba(224,99,99,0.85)] font-semibold">
                          {item.selectedWeight} kg
                        </span>
                      </p>
                    )}
                    {item.messageOnCake && (
                      <p className="text-sm sm:text-base text-[rgba(79,79,79,0.7)] break-words">
                        Message:{" "}
                        <span className="text-[rgba(224,99,99,0.85)] font-semibold italic">
                          "{item.messageOnCake}"
                        </span>
                      </p>
                    )}
                    <p className="font-semibold text-[rgba(79,79,79,0.7)] text-sm sm:text-base">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="w-full sm:w-auto text-center flex-shrink-0">
                  <p className="mb-2 text-[rgba(79,79,79,0.7)] text-xs sm:text-sm font-medium uppercase tracking-wide">
                    Price
                  </p>
                  <p className="font-bold text-[rgba(224,99,99,0.85)] text-xl sm:text-2xl">
                    ₹{(item.price * item.quantity).toFixed(0)}
                  </p>
                </div>
              </div>
            );
          }
        })}
      </div>

      {/* Summary section */}
      <div className="mt-8 sm:mt-10 pt-4 sm:pt-6 border-t border-[rgba(224,99,99,0.3)] space-y-3 sm:space-y-4 text-[rgba(79,79,79,0.7)]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 text-lg sm:text-xl font-semibold">
          <span className="flex items-center gap-2 text-[rgba(79,79,79,0.7)]">
            <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-[rgba(224,99,99,0.85)]" />
            Subtotal
          </span>
          <span className="text-[rgba(224,99,99,0.85)] font-semibold">
            ₹{subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 text-lg sm:text-xl font-semibold">
          <span className="flex items-center gap-2">
            <BadgePercent className="w-4 h-4 sm:w-5 sm:h-5 text-[rgba(224,99,99,0.85)]" />
            Discount
          </span>
          <span className="text-[rgba(224,99,99,0.85)]">
            − ₹{discount.toFixed(2)}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 text-lg sm:text-xl font-semibold">
          <span className="flex items-center gap-2">
            <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-[rgba(224,99,99,0.85)]" />
            Shipping
          </span>
          <span className="text-[rgba(224,99,99,0.85)]">
            ₹{shipping.toFixed(2)}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 text-lg sm:text-xl font-semibold">
          <span className="flex items-center gap-2">
            <Percent className="w-4 h-4 sm:w-5 sm:h-5 text-[rgba(224,99,99,0.85)]" />
            Tax
          </span>
          <span className="text-[rgba(224,99,99,0.85)]">₹{tax.toFixed(2)}</span>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 text-2xl sm:text-3xl font-bold border-t pt-4 sm:pt-5 border-[rgba(224,99,99,0.3)] text-[rgba(224,99,99,0.85)]">
          <span className="flex items-center gap-2 sm:gap-3">
            <IndianRupee className="w-6 h-6 sm:w-7 sm:h-7" />
            Total
          </span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
