import { MapPin, Pencil } from "lucide-react";

export default function BillingSection({
  billingDetails,
  sameAsShipping,
  onSameAsShippingChange,
  onBillingChange,
}) {
  return (
    <div className="group bg-gray-50 p-8 rounded-3xl border border-rose-200 shadow-[0_4px_20px_rgba(244,63,94,0.2)] transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MapPin className="text-rose-500" />
          <h2 className="text-2xl font-extrabold text-[rgba(79,79,79,0.66)] font-parastoo">
            Billing Address
          </h2>
        </div>

        <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-black">
          <input
            type="checkbox"
            checked={sameAsShipping}
            onChange={(e) => onSameAsShippingChange(e.target.checked)}
            className="w-5 h-5 accent-rose-500"
          />
          Same as shipping address
        </label>
      </div>

      {!sameAsShipping && (
           <div className="space-y-6  bg-gray-50 p-8 rounded-3xl border border-rose-200 shadow-[0_4px_20px_rgba(244,63,94,0.2)]">
          {/* Name / Email / Phone */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <InputBlock
              label="Full Name"
              placeholder="Riya Verma"
              value={billingDetails.name}
              onChange={(val) => onBillingChange("name", val)}
            />
            <InputBlock
              label="Email"
              placeholder="you@example.com"
              value={billingDetails.email}
              onChange={(val) => onBillingChange("email", val)}
            />
            <InputBlock
              label="Phone"
              placeholder="+91 9876543210"
              value={billingDetails.phone}
              onChange={(val) => onBillingChange("phone", val)}
            />
          </div>

          {/* Street Address */}
          <InputBlock
            label="Street Address"
            placeholder="123 Blossom Street"
            value={billingDetails.street}
            onChange={(val) => onBillingChange("street", val)}
          />

          {/* City and ZIP */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputBlock
              label="City"
              placeholder="Chennai"
              value={billingDetails.city}
              onChange={(val) => onBillingChange("city", val)}
            />
            <InputBlock
              label="ZIP Code"
              placeholder="600001"
              value={billingDetails.zipCode}
              onChange={(val) => onBillingChange("zipCode", val)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function InputBlock({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-lg font-semibold mb-2 text-[rgba(79,79,79,0.7)] font-parastoo">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-base rounded-xl border border-gray-300 bg-white hover:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all placeholder:text-gray-400 text-[rgba(79,79,79,0.7)] font-parastoo"
      />
    </div>
  );
}