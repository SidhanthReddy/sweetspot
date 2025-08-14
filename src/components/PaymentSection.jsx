import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { SiPaytm, SiGooglepay } from "react-icons/si";
import { FaUniversity } from "react-icons/fa";

export default function PaymentSection({
  paymentMethod,
  onPaymentMethodChange,
  onPayment,
  total,
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [upiId, setUpiId] = useState("");

  const mainPink = "rgba(224, 99, 99, 0.85)";
  const lightPink = "rgba(224, 99, 99, 0.05)";
  const greyText = "rgba(79,79,79,0.7)";
  const lightGreyText = "rgba(79,79,79,0.5)";
  const inputBorder = "rgba(224, 99, 99, 0.2)";
  const focusRing = "rgba(224, 99, 99, 0.3)";

  const paymentMethods = [
    {
      value: "credit-card",
      label: "Credit Card",
      desc: "Secure payment with any major card",
    },
    {
      value: "upi",
      label: "UPI",
      desc: "Pay with your UPI ID",
    },
    {
      value: "cod",
      label: "Cash on Delivery",
      desc: "You’ll pay after receiving the order",
    },
  ];

  const validateUpi = (id) =>
    /^\d{10}@(ybl|axl|paytm|okicici|oksbi|okhdfcbank|okaxis)$/.test(id);

  const handleStripePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      alert("Stripe is not loaded properly.");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      alert("Card element not found.");
      return;
    }

    const { error, paymentMethod: stripePaymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

    if (error) {
      console.error("Stripe error:", error);
      alert(error.message || "Payment error. Please try again.");
    } else {
      alert("Payment successful via Card!");
      if (onPayment) onPayment(stripePaymentMethod.id);
    }
  };

  const handleUpiPayment = () => {
    if (!validateUpi(upiId)) {
      alert("Enter a valid UPI ID (e.g., 9876543210@ybl)");
      return;
    }
    alert("Payment successful via UPI!");
    if (onPayment) onPayment(upiId);
  };

  // Trigger COD payment instantly when selected
  const handleMethodChange = (value) => {
    onPaymentMethodChange(value);
    if (value === "cod" && onPayment) {
      setTimeout(() => {
        onPayment("cod");
      }, 300); // short delay for UX
    }
  };

  return (
    <div className="font-parastoo">
      {/* Added total amount display at the top */}
      <div className="mb-6 p-4 rounded-xl border border-[rgba(224,99,99,0.3)] bg-[rgba(224,99,99,0.05)] text-[rgba(224,99,99,0.85)] font-bold text-2xl flex items-center justify-center">
        Total Amount to be Paid: ₹{total?.toFixed(2) ?? "0.00"}
      </div>
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <label
            key={method.value}
            className="flex items-center gap-4 p-6 rounded-2xl border transition-all duration-300 group hover:shadow-md cursor-pointer"
            style={{
              borderColor:
                paymentMethod === method.value ? mainPink : "rgba(0,0,0,0.1)",
              backgroundColor:
                paymentMethod === method.value ? lightPink : "#ffffff",
            }}
          >
            <input
              type="radio"
              value={method.value}
              checked={paymentMethod === method.value}
              onChange={(e) => handleMethodChange(e.target.value)}
              className="w-6 h-6 accent-[rgba(224,99,99,0.85)]"
              style={{ cursor: "pointer" }}
            />
            <div className="flex-1">
              <div
                className="font-semibold text-lg"
                style={{ color: greyText }}
              >
                {method.label}
              </div>
              <div className="text-sm mt-1" style={{ color: lightGreyText }}>
                {method.desc}
              </div>
            </div>
          </label>
        ))}

        {/* Credit Card UI */}
        {paymentMethod === "credit-card" && (
          <div
            className="space-y-6 p-6 rounded-2xl border shadow-sm mt-6 bg-white"
            style={{ borderColor: inputBorder }}
          >
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: greyText }}
            >
              Card Details
            </label>
            <div
              className="p-4 border rounded-xl"
              style={{ borderColor: inputBorder }}
            >
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      fontFamily: "parastoo, sans-serif",
                      color: "#32325d",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#fa755a",
                    },
                  },
                }}
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleStripePayment}
                className="px-6 py-3 rounded-xl font-bold text-white bg-[rgba(224,99,99,0.85)] hover:bg-[rgba(224,99,99,0.65)] transition-all duration-300"
              >
                Pay ₹{total?.toFixed(2) ?? "0.00"}
              </button>
            </div>
          </div>
        )}

        {/* UPI Payment UI */}
        {paymentMethod === "upi" && (
          <div
            className="space-y-4 p-6 rounded-2xl border shadow-sm mt-6 bg-white"
            style={{ borderColor: inputBorder }}
          >
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: greyText }}
            >
              Enter UPI ID
            </label>
            <input
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="9876543210@ybl"
              className="w-full p-3 border rounded-md text-black focus:outline-none focus:ring-2"
              style={{
                borderColor: inputBorder,
                outlineColor: focusRing,
              }}
            />
            <div className="flex justify-around text-3xl mt-4">
              <SiPaytm className="text-blue-600 hover:scale-110 transition-transform" />
              <FaUniversity className="text-purple-600 hover:scale-110 transition-transform" />
              <SiGooglepay className="text-green-600 hover:scale-110 transition-transform" />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleUpiPayment}
                className="px-6 py-3 rounded-xl font-bold text-white bg-[rgba(224,99,99,0.85)] hover:bg-[rgba(224,99,99,0.65)] transition-all duration-300"
              >
                Pay ₹{total?.toFixed(2) ?? "0.00"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
