import React, { useState } from "react";

export default function StripeCardForm({ amount, onPayment }) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cardNumber || !expiry || !cvc || !name) {
      alert("Please fill out all required payment fields.");
      return;
    }

    // TODO: Add real Stripe validation or formatting later

    // Trigger payment flow
    onPayment();
  };

  return (
    <form className="space-y-6 font-parastoo" autoComplete="off" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-[rgba(79,79,79,0.7)] text-sm mb-1">Card Number</label>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="w-full p-3 border rounded-xl border-[rgba(224,99,99,0.5)] focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[rgba(79,79,79,0.7)] text-sm mb-1">Expiry Date</label>
          <input
            type="text"
            placeholder="MM/YY"
            inputMode="numeric"
            autoComplete="off"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            className="w-full p-3 border rounded-xl border-[rgba(224,99,99,0.5)] focus:outline-none"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-[rgba(79,79,79,0.7)] text-sm mb-1">CVC</label>
          <input
            type="password"
            placeholder="CVC"
            inputMode="numeric"
            autoComplete="off"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            className="w-full p-3 border rounded-xl border-[rgba(224,99,99,0.5)] focus:outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 w-full bg-[rgba(224,99,99,0.85)] hover:bg-[rgba(219,117,128,0.925)] text-white py-3 rounded-xl transition"
      >
        Pay ₹{amount}
      </button>
    </form>
  );
}