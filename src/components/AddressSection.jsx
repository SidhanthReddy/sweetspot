import { Pencil,MapPin } from "lucide-react";

export default function AddressSection({
  title = "Shipping Address",
  userProfile,
  isEditing,
  onEditToggle,
  onFieldChange,
}) {
  return (
      <div className="group bg-gray-50 p-8 rounded-3xl border border-rose-200 shadow-[0_4px_20px_rgba(244,63,94,0.2)] transition-all duration-300">
      {/* Header */}
     {/* Header */}
<div className="mb-6 flex items-center justify-between">
  <div className="flex items-center gap-3">
    <MapPin className="text-rose-500" size={28} />
     <h2 className="text-2xl font-extrabold text-[rgba(79,79,79,0.66)] font-parastoo">
      {title}
      </h2>
      </div>
  <button
    onClick={onEditToggle}
    className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold shadow-sm transition-all duration-300 hover:scale-[1.03] ${
      isEditing
        ? "bg-rose-600 text-white hover:bg-rose-700"
        : "bg-rose-100 text-rose-600 hover:bg-rose-200"
    }`}
  >
    <Pencil size={18} />
    {isEditing ? "Save" : "Edit"}
  </button>
</div>

      {/* View Mode */}
      {/* View Mode */}
        {!isEditing ? (
          <div className="space-y-4 px-6 py-5 text-gray-700 text-lg bg-gray-100 rounded-2xl border border-gray-200 shadow-inner">
            <div className="flex gap-4 items-center">
              <span className="font-semibold">👤</span>
              <span>
                {userProfile.firstName} {userProfile.lastName}
              </span>
            </div>
            <div className="flex gap-4 items-center">
              <span className="font-semibold">📧</span>
              <span>{userProfile.email}</span>
            </div>
            <div className="flex gap-4 items-center">
              <span className="font-semibold">📞</span>
              <span>{userProfile.phone}</span>
            </div>
            <div className="flex gap-4 items-start">
              <MapPin size={20} className="text-rose-500 mt-1" />
              <div className="text-gray-600 space-y-1">
                <div>{userProfile.address?.street}</div>
                <div>{userProfile.address?.city}, {userProfile.address?.zipCode}</div>

              </div>
            </div>
          </div>
        ) : (
  // Edit mode remains unchanged

        // Edit Mode
        <div className="space-y-6 p-6 rounded-2xl bg-white/90 backdrop-blur-sm transition-all duration-300 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <InputBlock
              label="First Name"
              placeholder="Riya"
              value={userProfile.firstName}
              onChange={(val) => onFieldChange("firstName", val)}
            />
            <InputBlock
              label="Last Name"
              placeholder="Verma"
              value={userProfile.lastName}
              onChange={(val) => onFieldChange("lastName", val)}
            />
            <InputBlock
              label="Phone"
              placeholder="+91 9876543210"
              value={userProfile.phone}
              onChange={(val) => onFieldChange("phone", val)}
            />
            <InputBlock
              label="Email"
              placeholder="you@example.com"
              value={userProfile.email}
              onChange={(val) => onFieldChange("email", val)}
            />
          </div>

         <InputBlock
  label="Street Address"
  placeholder="123 Blossom Street"
  value={userProfile.address.street}
  onChange={(val) =>
    onFieldChange("address", {
      ...userProfile.address,
      street: val,
    })
  }
/>

<div className="grid grid-cols-2 gap-4">
  <InputBlock
    label="City"
    placeholder="Chennai"
    value={userProfile.address.city}
    onChange={(val) =>
      onFieldChange("address", {
        ...userProfile.address,
        city: val,
      })
    }
  />
  <InputBlock
    label="ZIP Code"
    placeholder="600001"
    value={userProfile.address.zipCode}
    onChange={(val) =>
      onFieldChange("address", {
        ...userProfile.address,
        zipCode: val,
      })
    }
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
