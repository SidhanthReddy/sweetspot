import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { register, login, signInWithGoogle } from "../Services/authService";
import { useAuth } from "../hooks/useAuth";
import { saveAddress } from "../data/address";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  Map,
  Cake,
  Cookie,
  Heart,
  Star,
  Gift,
  Sparkles,
  Cherry,
  Coffee,
  Candy,
  IceCream,
  Lollipop,
  Donut,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Define custom marker icon
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Floating Element Component
const FloatingElement = ({ x, y, size, duration, delay, icon, color }) => (
  <div
    className="absolute pointer-events-none opacity-20"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      fontSize: `${size}px`,
      color: color,
      animation: `float ${duration}s ease-in-out ${delay}s infinite, pulse 3s ease-in-out infinite`,
    }}
  >
    <div
      className="w-full h-full opacity-20 flex items-center justify-center animate-pulse"
      style={{ color: color }}
    >
      {icon}
    </div>
  </div>
);

// Component to handle map click events
const LocationMarker = ({ position, setPosition, setAddress }) => {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      setAddress((prev) => ({
        ...prev,
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      }));
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={customIcon} />
  );
};

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [currentStep, setCurrentStep] = useState(1); // For multi-step signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Floating elements animation
  const [floatingElements, setFloatingElements] = useState([]);

  // Personal info fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Address fields
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "Karnataka",
    postalCode: "",
    latitude: 12.9716, // Default: Bangalore
    longitude: 77.5946,
  });
  const [position, setPosition] = useState([12.9716, 77.5946]);

  const navigate = useNavigate();
  const { user } = useAuth();

  // Generate random floating elements
  useEffect(() => {
    const icons = [
      <Cake className="w-full h-full" />,
      <Cookie className="w-full h-full" />,
      <Heart className="w-full h-full" />,
      <Star className="w-full h-full" />,
      <Gift className="w-full h-full" />,
      <Sparkles className="w-full h-full" />,
      <Cherry className="w-full h-full" />,
      <Coffee className="w-full h-full" />,
      <Candy className="w-full h-full" />,
      <IceCream className="w-full h-full" />,
      <Lollipop className="w-full h-full" />,
      <Donut className="w-full h-full" />,
    ];
    const colors = [
      "#E11D48",
      "#F59E0B",
      "#EF4444",
      "#EC4899",
      "#F97316",
      "#8B5CF6",
      "#06B6D4",
      "#10B981",
      "#3B82F6",
      "#6366F1",
      "#D946EF",
      "#F43F5E",
      "#A855F7",
    ];

    const elements = Array.from({ length: 30 }, (_, i) => {
      const iconIndex = Math.floor(Math.random() * icons.length);
      const colorIndex = Math.floor(Math.random() * colors.length);

      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 30 + 40,
        duration: Math.random() * 15 + 20,
        delay: Math.random() * 8,
        icon: icons[iconIndex],
        color: colors[colorIndex],
      };
    });
    setFloatingElements(elements);
  }, []);

  // Redirect to home if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep1 = () => {
    if (!email || !password || (!isLogin && !confirmPassword)) {
      setError("Please fill in all required fields");
      return false;
    }
    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!firstName || !lastName || !phoneNumber) {
      setError("Please fill in all personal information");
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!address.street || !address.city || !address.postalCode) {
      setError("Please fill in all address fields");
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    setError("");

    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;

    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setError("");
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        navigate("/");
      } else {
        // For signup, validate all steps
        if (!validateStep1() || !validateStep2() || !validateStep3()) {
          setLoading(false);
          return;
        }

        // Create user account
        const userCredential = await register(email, password);
        const newUser = userCredential.user;
        // Save address with phone number
        const addressData = {
          ...address,
          phone: phoneNumber,
        };

        await saveAddress(newUser.uid, addressData);

        // Update user profile with display name
        if (newUser.updateProfile) {
          await newUser.updateProfile({
            displayName: `${firstName} ${lastName}`.trim(),
          });
        }

        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setCurrentStep(1);
    setError("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setAddress({
      street: "",
      city: "",
      state: "Telangana",
      postalCode: "",
      latitude: 12.9716,
      longitude: 77.5946,
    });
    setPosition([12.9716, 77.5946]);
  };

  const renderLoginForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Email Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none transition-all"
            placeholder="Enter your email"
          />
        </div>
      </div>

      {/* Password Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none transition-all"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-red-400 text-white py-3 rounded-lg hover:bg-red-500 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center"
      >
        {loading ? (
          "Please wait..."
        ) : (
          <>
            <Cake className="w-5 h-5 mr-2 group-hover:animate-bounce-and-rotate" />
            Sign In
          </>
        )}
      </button>
    </form>
  );

  const renderSignupStep1 = () => (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Progress Indicator */}
      <div className="flex items-center justify-center space-x-2 mb-6">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-red-400 text-white rounded-full flex items-center justify-center text-sm font-medium">
            1
          </div>
          <div className="text-xs text-red-400 mt-1 ml-1">Account</div>
        </div>
        <div className="w-8 h-px bg-gray-300"></div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
            2
          </div>
          <div className="text-xs text-gray-500 mt-1 ml-1">Personal</div>
        </div>
        <div className="w-8 h-px bg-gray-300"></div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
            3
          </div>
          <div className="text-xs text-gray-500 mt-1 ml-1">Address</div>
        </div>
      </div>

      {/* Email Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none transition-all"
            placeholder="Enter your email"
          />
        </div>
      </div>

      {/* Password Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none transition-all"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none transition-all"
            placeholder="Confirm your password"
          />
        </div>
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={handleNextStep}
        className="w-full bg-red-400 text-white py-3 rounded-lg hover:bg-red-500 transition-colors font-medium"
      >
        Next: Personal Information
      </button>
    </div>
  );

  const renderSignupStep2 = () => (
    <div className="space-y-6">
      {/* ... Progress Indicator ... */}

      <h3 className="text-lg font-semibold text-gray-800 text-center mb-4">
        Personal Information
      </h3>

      {/* Name Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="firstName"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete="given-name"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none transition-all"
              placeholder="First name"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="lastName"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              autoComplete="family-name"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none transition-all"
              placeholder="Last name"
            />
          </div>
        </div>
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="tel"
            name="phoneNumber"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            autoComplete="tel"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none transition-all"
            placeholder="+91 9876543210"
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={handlePrevStep}
          className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNextStep}
          className="flex-1 bg-red-400 text-white py-3 rounded-lg hover:bg-red-500 transition-colors font-medium"
        >
          Next: Address
        </button>
      </div>
    </div>
  );

  const renderSignupStep3 = () => (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Progress Indicator */}
      <div className="flex items-center justify-center space-x-2 mb-6">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
            ✓
          </div>
          <div className="text-xs text-green-500 mt-1 ml-1">Account</div>
        </div>
        <div className="w-8 h-px bg-green-500"></div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
            ✓
          </div>
          <div className="text-xs text-green-500 mt-1 ml-1">Personal</div>
        </div>
        <div className="w-8 h-px bg-green-500"></div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-red-400 text-white rounded-full flex items-center justify-center text-sm font-medium">
            3
          </div>
          <div className="text-xs text-red-400 mt-1 ml-1">Address</div>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 text-center mb-4">
        Delivery Address
      </h3>
      <p className="text-sm text-gray-600 text-center mb-4">
        Click on the map to set your location
      </p>

      {/* Map */}
      <div className="h-48 rounded-lg overflow-hidden border">
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          key={`${position[0]}-${position[1]}`}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker
            position={position}
            setPosition={setPosition}
            setAddress={setAddress}
          />
        </MapContainer>
      </div>

      {/* Address Fields */}
    <div className="grid grid-cols-1 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Street Address
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            name="street"
            required
            value={address.street}
            onChange={handleAddressChange}
            autoComplete="address-line1"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none transition-all"
            placeholder="Enter street address"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City
          </label>
          <input
            type="text"
            name="city"
            required
            value={address.city}
            onChange={handleAddressChange}
            autoComplete="address-level2"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none transition-all"
            placeholder="City"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State
          </label>
          <input
            type="text"
            name="state"
            required
            value={address.state}
            onChange={handleAddressChange}
            autoComplete="address-level1"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none transition-all"
            placeholder="State"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Postal Code
        </label>
        <input
          type="text"
          name="postalCode"
          required
          value={address.postalCode}
          onChange={handleAddressChange}
          autoComplete="postal-code"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none transition-all"
          placeholder="Postal code"
        />
      </div>
    </div>

    {/* Coordinates Display - No autoComplete needed for readonly fields */}
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-500 mb-2">
          Latitude
        </label>
        <input
          type="number"
          value={address.latitude}
          readOnly
          className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-500 mb-2">
          Longitude
        </label>
        <input
          type="number"
          value={address.longitude}
          readOnly
          className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm"
        />
      </div>
    </div>

    {/* Navigation Buttons */}
    <div className="flex space-x-4">
      <button
        type="button"
        onClick={handlePrevStep}
        className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium"
      >
        Back
      </button>
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={loading}
        className="flex-1 bg-red-400 text-white py-3 rounded-lg hover:bg-red-500 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>
    </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Floating Elements Background */}
      {floatingElements.map((element) => (
        <FloatingElement
          key={element.id}
          x={element.x}
          y={element.y}
          size={element.size}
          duration={element.duration}
          delay={element.delay}
          icon={element.icon}
          color={element.color}
        />
      ))}

      {/* CSS Animation Keyframes */}
      <style>
        {`
          @keyframes float {
            0% {
              transform: translateY(0px) rotate(0deg) scale(1);
              opacity: 0.15;
            }
            33% {
              transform: translateY(-40px) rotate(15deg) scale(1.1);
              opacity: 0.25;
            }
            66% {
              transform: translateY(-20px) rotate(-10deg) scale(0.9);
              opacity: 0.2;
            }
            100% {
              transform: translateY(0px) rotate(0deg) scale(1);
              opacity: 0.15;
            }
          }
          @keyframes bounce-and-rotate {
            0%, 100% {
              transform: translateY(0) rotate(0deg);
            }
            20% {
              transform: translateY(-5px) rotate(5deg);
            }
            40% {
              transform: translateY(0) rotate(-5deg);
            }
            60% {
              transform: translateY(-2px) rotate(2deg);
            }
            80% {
              transform: translateY(0) rotate(-2deg);
            }
          }
        `}
      </style>
      <div
        className={`w-full bg-white rounded-xl shadow-2xl p-8 relative z-10 ${
          isLogin ? "max-w-md" : "max-w-2xl"
        }`}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center">
            <Cake className="w-8 h-8 text-red-400 animate-bounce-and-rotate mr-2" />
            <span className="text-gray-600">Sweet</span><span className="text-red-400">Spot</span>
          </h1>
          <p className="text-gray-600 mt-2">
            {isLogin ? "Welcome back!" : "Create your account"}
          </p>
        </div>

        {/* Form Content */}
        {isLogin
          ? renderLoginForm()
          : currentStep === 1
          ? renderSignupStep1()
          : currentStep === 2
          ? renderSignupStep2()
          : renderSignupStep3()}

        {/* Google Sign In - Only show for login or step 1 */}
        {(isLogin || currentStep === 1) && (
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="mt-4 w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
          </div>
        )}

        {/* Toggle Login/Register - Only show on login or first step */}
        {(isLogin || currentStep === 1) && (
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={toggleMode}
                className="ml-2 text-red-400 hover:text-red-500 font-medium"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
