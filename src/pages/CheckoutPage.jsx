import { useState, useEffect, useRef } from "react";
import { useCart } from "../components/CartContext.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import AddressSection from "../components/AddressSection.jsx";
import BillingSection from "../components/BillingSection.jsx";
import PaymentSection from "../components/PaymentSection.jsx";
import OrderReview from "../components/OrderReview.jsx";
import Decorations from "../components/Decorations.jsx";
import SavingsPopup from "../components/SavingsPopup.jsx";
// Removed mockUserProfile import - using dynamic data from auth and address service
import {
  ArrowLeft,
  FileText,
  CreditCard,
  Loader2,
  Clock,
  Calendar,
} from "lucide-react";
import DeliverySteps from "../components/DeliverySteps.jsx";
import CheckOutHeader from "../components/CheckOutHeader.jsx";
import NavBar from "../components/NavBar.jsx";
import OrderPopup from "../components/OrderPopup.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { addOrder } from "../data/orderData.js";
import {
  getAddressByUserId,
  hasAddress,
  getFormattedAddress,
} from "../data/address";

// Egg/Eggless Indicator Component
const EggIndicator = ({ eggOption }) => {
  if (!eggOption) return null;

  const isEggless =
    eggOption.toLowerCase().includes("eggless") ||
    eggOption.toLowerCase().includes("without egg") ||
    eggOption.toLowerCase() === "no egg";

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

// Utility functions for Indian timezone
const getIndianDate = (date = new Date()) => {
  // Create a new date object in Indian timezone
  const indianTime = new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
  return indianTime;
};

const getIndianDateString = (date = new Date()) => {
  // Get Indian date components directly
  const indianDateStr = date.toLocaleDateString("en-CA", {
    timeZone: "Asia/Kolkata",
  }); // en-CA gives YYYY-MM-DD format
  return indianDateStr;
};

// Function to create date string from date parts (prevents timezone issues)
const createDateString = (year, month, day) => {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
    2,
    "0"
  )}`;
};

// Enhanced CheckoutPage.jsx - Key modifications to save delivery date/time
// Add this utility function at the top of your file (around line 15, after imports)
const createDeliveryDateTime = (dateString, timeString) => {
  if (!dateString || !timeString) return null;

  const [year, month, day] = dateString.split("-").map((num) => parseInt(num));
  const [hours, minutes] = timeString.split(":").map((num) => parseInt(num));

  // Create the delivery datetime
  const deliveryDateTime = new Date(year, month - 1, day, hours, minutes);

  return deliveryDateTime.toISOString();
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const calendarRef = useRef(null);
  const timeRef = useRef(null);

  // Safe navigation helper
  const safeNavigate = (path) => {
    try {
      navigate(path);
    } catch (error) {
      console.error("Navigation error:", error);
      window.location.href = path;
    }
  };

  // Defensive programming for cart context
  const cartContext = useCart();
  const { cartItems = [], resetCart = () => {} } = cartContext || {};

  const authContext = useAuth();
  const { user, loading } = authContext || {};

  // State management - Initialize with empty values, will be populated from auth/address
  const [userProfile, setUserProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      zipCode: "",
    },
  });

  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    latitude: null,
    longitude: null,
  });

  const [billingAddress, setBillingAddress] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [cartTotal, setCartTotal] = useState(0);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showSavingsPopup, setShowSavingsPopup] = useState(false);
  const [savingsPopupData, setSavingsPopupData] = useState({
    savings: 0,
    itemName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [addressLoaded, setAddressLoaded] = useState(false);

  // Calendar and Time state
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");

  // Get today's date in Indian timezone
  const todayString = getIndianDateString();

  // Generate time slots (9 AM to 9 PM, 30-minute intervals)
  const generateTimeSlots = () => {
    const slots = [];

    // Get current time in Indian timezone
    const indianNow = getIndianDate();
    const isToday = deliveryDate === todayString;

    for (let hour = 9; hour <= 21; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 21 && minute > 0) break; // Stop at 9:00 PM

        const time24 = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        const hour12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        const ampm = hour >= 12 ? "PM" : "AM";
        const time12 = `${hour12}:${minute
          .toString()
          .padStart(2, "0")} ${ampm}`;

        // Check if time slot is in the past for today (using Indian timezone)
        let isPastTime = false;
        if (isToday) {
          const slotTime = new Date(indianNow);
          slotTime.setHours(hour, minute, 0, 0);
          // Add 1 hour buffer for preparation time
          const currentTimePlusBuffer = new Date(
            indianNow.getTime() + 60 * 60 * 1000
          );
          isPastTime = slotTime <= currentTimePlusBuffer;
        }

        slots.push({
          value: time24,
          label: time12,
          isPastTime: isPastTime,
          isDisabled: isPastTime,
        });
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Handle click outside calendar and time picker
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
      if (timeRef.current && !timeRef.current.contains(event.target)) {
        setIsTimeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Format date for display using Indian locale
  const formatDate = (dateString) => {
    if (!dateString) return "";

    // Parse the date string and ensure it's treated as local date
    const [year, month, day] = dateString
      .split("-")
      .map((num) => parseInt(num));
    const date = new Date(year, month - 1, day);

    // Format in Indian locale
    return date.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format complete date time display
  const formatDisplayDateTime = () => {
    if (!deliveryDate && !deliveryTime) return "Select Date & Time";
    if (!deliveryDate) return "Select Date";
    if (!deliveryTime) return formatDate(deliveryDate) + " - Select Time";

    const timeSlot = timeSlots.find((slot) => slot.value === deliveryTime);
    return (
      formatDate(deliveryDate) + " at " + (timeSlot?.label || deliveryTime)
    );
  };

  // Generate calendar days with Indian timezone
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const currentDate = new Date(startDate);

    // Get today's date string in Indian timezone for comparison
    const todayDateString = getIndianDateString();

    for (let i = 0; i < 42; i++) {
      // Create date string directly from date components to avoid timezone conversion issues
      const dateString = createDateString(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        currentDate.getDate()
      );

      const isCurrentMonth = currentDate.getMonth() === month;
      const isToday = dateString === todayDateString;
      const isSelected = dateString === deliveryDate;

      // Compare date strings instead of Date objects to avoid timezone issues
      const isPastDate = dateString < todayDateString;

      days.push({
        date: new Date(currentDate),
        dateString,
        day: currentDate.getDate(),
        isCurrentMonth,
        isToday,
        isSelected,
        isPastDate,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };

  const handleDateSelect = (dateString) => {
    setDeliveryDate(dateString);
    setIsCalendarOpen(false);
  };

  const handleTimeSelect = (timeValue) => {
    setDeliveryTime(timeValue);
    setIsTimeOpen(false);
  };

  const navigateMonth = (direction) => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Load user's saved address and auth data when component mounts or user changes
  useEffect(() => {
    if (user && !addressLoaded) {
      // First, populate user profile from auth data
      const displayName = user.displayName || "";
      const nameParts = displayName.split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      const initialUserProfile = {
        firstName: firstName,
        lastName: lastName,
        email: user.email || "",
        phone: user.phoneNumber || "",
        address: {
          street: "",
          city: "",
          zipCode: "",
        },
      };

      // Check for saved address
      const savedAddress = getAddressByUserId(user.uid);

      if (savedAddress) {
        // Update shipping address with saved address
        setShippingAddress({
          street: savedAddress.street || "",
          city: savedAddress.city || "",
          state: savedAddress.state || "",
          zipCode: savedAddress.postalCode || "",
          latitude: savedAddress.latitude || null,
          longitude: savedAddress.longitude || null,
        });

        // Update user profile address section
        initialUserProfile.address = {
          street: savedAddress.street || "",
          city: savedAddress.city || "",
          zipCode: savedAddress.postalCode || "",
        };
      }
      if (!initialUserProfile.phone && savedAddress?.phone) {
        initialUserProfile.phone = savedAddress.phone;
      }
      setUserProfile(initialUserProfile);
      setAddressLoaded(true);
    }
  }, [user, addressLoaded]);

  // Update billing address when userProfile or shippingAddress changes
  useEffect(() => {
    if (sameAsShipping) {
      setBillingAddress((prev) => ({
        ...prev,
        name: `${userProfile?.firstName || ""} ${
          userProfile?.lastName || ""
        }`.trim(),
        email: userProfile?.email || "",
        phone: userProfile?.phone || "",
        street: shippingAddress.street,
        city: shippingAddress.city,
        state: shippingAddress.state,
        zipCode: shippingAddress.zipCode,
      }));
    }
  }, [shippingAddress, sameAsShipping, userProfile]);

  // Initialize billing address when user profile is loaded
  useEffect(() => {
    setBillingAddress((prev) => ({
      ...prev,
      name: `${userProfile?.firstName || ""} ${
        userProfile?.lastName || ""
      }`.trim(),
      email: userProfile?.email || "",
      phone: userProfile?.phone || "",
    }));
  }, [userProfile]);

  // Event Handlers
  const handleShippingChange = (field, value) => {
    const updatedShipping = { ...shippingAddress, [field]: value };
    setShippingAddress(updatedShipping);

    if (sameAsShipping) {
      setBillingAddress((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleBillingChange = (field, value) => {
    setBillingAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleSameAsShippingChange = (checked) => {
    setSameAsShipping(checked);

    if (checked) {
      setBillingAddress((prev) => ({
        ...prev,
        street: shippingAddress.street,
        city: shippingAddress.city,
        state: shippingAddress.state,
        zipCode: shippingAddress.zipCode,
      }));
    } else {
      // Reset billing address to user auth data, not static profile
      setBillingAddress({
        name: `${userProfile?.firstName || ""} ${
          userProfile?.lastName || ""
        }`.trim(),
        email: userProfile?.email || "",
        phone: userProfile?.phone || "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
      });
    }
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleFieldChange = (field, value) => {
    setUserProfile((prev) => ({ ...prev, [field]: value }));
  };

  const goToNextStep = async () => {
    try {
      setIsLoading(true);

      if (currentStep === 1) {
        setLoadingMessage("Preparing Review...");
      } else if (currentStep === 2) {
        setLoadingMessage("Loading Payment...");
      }

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setCurrentStep((prev) => prev + 1);
    } catch (error) {
      console.error("Error navigating to next step:", error);
    } finally {
      setIsLoading(false);
      setLoadingMessage("");
    }
  };

  const goToPrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Modify the handlePayment function (around line 300) to include the enhanced delivery data
  const handlePayment = async () => {
    try {
      if (!user) {
        alert("Please log in to place an order.");
        return;
      }

      if (!isStep3Valid()) {
        alert(
          "Please fill out all required fields including delivery date and time."
        );
        return;
      }

      setIsLoading(true);
      setLoadingMessage("Processing order...");

      // Format addresses for order data
      const formattedShippingAddress = `${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zipCode}`;
      const formattedBillingAddress = `${billingAddress.name}, ${billingAddress.street}, ${billingAddress.city}, ${billingAddress.state} ${billingAddress.zipCode}`;

      // Format delivery date and time
      const selectedTimeSlot = timeSlots.find(
        (slot) => slot.value === deliveryTime
      );
      const formattedDeliveryDateTime =
        deliveryDate && deliveryTime
          ? `${formatDate(deliveryDate)} at ${
              selectedTimeSlot?.label || deliveryTime
            }`
          : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString();

      // Create precise delivery datetime for tracking
      const preciseDeliveryDateTime = createDeliveryDateTime(
        deliveryDate,
        deliveryTime
      );

      const orderData = {
        customerName: `${userProfile.firstName} ${userProfile.lastName}`,
        email: userProfile.email,
        phone: userProfile.phone,
        shippingAddress: formattedShippingAddress,
        billingAddress: formattedBillingAddress,
        paymentMethod,
        cartItems,
        total: cartTotal,
        orderDate: new Date().toLocaleDateString(),
        estimatedDelivery: formattedDeliveryDateTime,
        status: 1,
        cakeName:
          cartItems.length === 1
            ? cartItems[0].name
            : `${cartItems.length} items`,

        // Enhanced delivery tracking data
        deliveryDate: deliveryDate
          ? (() => {
              const [year, month, day] = deliveryDate.split("-");
              return new Date(
                parseInt(year),
                parseInt(month) - 1,
                parseInt(day)
              ).toLocaleDateString();
            })()
          : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),

        deliveryTime: deliveryTime || "Not specified",
        deliveryDateTime: formattedDeliveryDateTime,

        // NEW: Add precise tracking data
        selectedDeliveryDate: deliveryDate, // Store the selected date string (YYYY-MM-DD)
        selectedDeliveryTime: deliveryTime, // Store the selected time string (HH:MM)
        preciseDeliveryDateTime: preciseDeliveryDateTime, // Store the exact datetime as ISO string
        selectedTimeSlot: selectedTimeSlot?.label || deliveryTime, // Store the formatted time slot
        orderCreatedAt: new Date().toISOString(), // Store when order was created

        amount: `₹${cartTotal.toFixed(2)}`,
        address: formattedShippingAddress,
        image:
          cartItems.length > 0
            ? cartItems[0].imageURL || cartItems[0].image || ""
            : "",
        specialInstructions: "",

        // Store actual user and address data
        customerDetails: {
          userId: user.uid,
          displayName: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          emailVerified: user.emailVerified,
        },
        addressDetails: {
          shipping: {
            ...shippingAddress,
            coordinates:
              shippingAddress.latitude && shippingAddress.longitude
                ? {
                    lat: shippingAddress.latitude,
                    lng: shippingAddress.longitude,
                  }
                : null,
          },
          billing: billingAddress,
          hasSavedAddress: hasAddress(user.uid),
          addressLastUpdated: hasAddress(user.uid)
            ? getAddressByUserId(user.uid).lastUpdated
            : null,
        },
      };

      await addOrder(user.uid, orderData);
      setShowOrderModal(true);
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("There was an error processing your order. Please try again.");
    } finally {
      setIsLoading(false);
      setLoadingMessage("");
    }
  };

  const handleShowSavingsPopup = (savings, itemName) => {
    setSavingsPopupData({ savings, itemName });
    setShowSavingsPopup(true);
  };

  const handleCloseSavingsPopup = () => {
    setShowSavingsPopup(false);
  };

  const handleCloseOrderModal = () => {
    setShowOrderModal(false);
    if (resetCart) resetCart();
  };

  // Validation functions
  const isStep1Valid = () => {
    // Add actual validation logic if needed
    return true;
  };

  const isStep3Valid = () => {
    const profileValid =
      userProfile?.firstName &&
      userProfile?.lastName &&
      userProfile?.email &&
      userProfile?.phone;

    const shippingValid =
      shippingAddress.street &&
      shippingAddress.city &&
      shippingAddress.state &&
      shippingAddress.zipCode;

    const billingValid = sameAsShipping
      ? true
      : billingAddress.name &&
        billingAddress.email &&
        billingAddress.phone &&
        billingAddress.street &&
        billingAddress.city &&
        billingAddress.state &&
        billingAddress.zipCode;

    const deliveryValid = deliveryDate && deliveryTime;

    return profileValid && shippingValid && billingValid && deliveryValid;
  };

  // Loading state - show spinner while auth is being checked
  if (loading) {
    return (
      <div className="min-h-screen bg-soft-pink flex flex-col font-parastoo">
        <CheckOutHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-400 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // Not logged in - show login prompt
  if (!user) {
    return (
      <div className="min-h-screen bg-soft-pink flex flex-col font-parastoo">
        <NavBar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Please log in to proceed with checkout
            </p>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 transition-colors"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Generate order ID
  const orderId = "ORD" + Math.floor(Math.random() * 1000000);

  // Transform cart items for OrderReview
  const transformedCartItems = (cartItems || []).map((item) => {
    // Base transformation for all items
    const baseTransform = {
      price: item?.price || 0,
      quantity: item?.quantity || 1,
      unitPrice: (item?.price || 0) / (item?.selectedWeight || 1),
      totalPrice:
        ((item?.price || 0) / (item?.selectedWeight || 1)) *
        (item?.quantity || 1) *
        (item?.selectedWeight || 1),
    };

    // Handle decorations differently from cakes
    if (item?.isDecoration || item?.category === "decoration") {
      return {
        ...baseTransform,
        decorationId: item?.id,
        cakeImage:
          item?.imageURL || item?.image || "/path/to/default-image.jpg",
        cakeName: item?.name || "Unknown Decoration",
        cakeDescription: item?.description || "Decoration item.",
        cakeFlavour: null,
        cakeEggOptions: [],
        selectedWeight: null,
        eggOption: null,
        messageOnCake: null,
        isDecoration: true,
        category: "decoration",
        selectedEggOption: null,
        cakeWeight: null,
        weightInKg: null,
        customMessage: null,
        eggIndicator: null,
      };
    } else {
      // Handle regular cakes
      const eggOption = item?.eggOption || "Egg";
      const selectedWeight = item?.selectedWeight || 1;

      return {
        ...baseTransform,
        cakeId: item?.id,
        cakeImage:
          item?.imageURL || item?.cakeImage || "/path/to/default-image.jpg",
        cakeName: item?.name || item?.cakeName || "Unknown Cake",
        cakeDescription:
          item?.description || item?.cakeDescription || "Delicious cake.",
        cakeFlavour: item?.flavour || item?.cakeFlavour || "Classic",
        cakeEggOptions: Array.isArray(item?.eggOptions)
          ? item.eggOptions
          : item?.cakeEggOptions
          ? [item.cakeEggOptions]
          : [eggOption],
        selectedWeight: selectedWeight,
        eggOption: eggOption,
        messageOnCake: item?.messageOnCake,
        isDecoration: false,
        category: item?.category || "cake",
        selectedEggOption: eggOption,
        cakeWeight: selectedWeight,
        weightInKg: `${selectedWeight} kg`,
        customMessage: item?.messageOnCake || "",
        eggIndicator: <EggIndicator eggOption={eggOption} />,
      };
    }
  });

  // Order data for modal
  const orderData = {
    orderId,
    customerName: `${userProfile?.firstName || ""} ${
      userProfile?.lastName || ""
    }`.trim(),
    email: userProfile?.email || "",
    phone: userProfile?.phone || "",
    shippingAddress,
    billingAddress,
    paymentMethod,
    cartItems: transformedCartItems,
    total: cartTotal,
    orderDate: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    estimatedDelivery:
      deliveryDate && deliveryTime
        ? `${formatDate(deliveryDate)} at ${
            timeSlots.find((slot) => slot.value === deliveryTime)?.label ||
            deliveryTime
          }`
        : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          ),
  };

  // Button content helper
  const getButtonContent = (step) => {
    if (isLoading) {
      return (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="hidden sm:inline">{loadingMessage}</span>
          <span className="sm:hidden">Loading...</span>
        </>
      );
    }

    if (step === 1) {
      return (
        <>
          <FileText className="w-4 h-4" />
          <span className="hidden sm:inline">Proceed to Review</span>
          <span className="sm:hidden">Review</span>
        </>
      );
    } else {
      return (
        <>
          <CreditCard className="w-4 h-4" />
          <span className="hidden sm:inline">Proceed to Payment</span>
          <span className="sm:hidden">Payment</span>
        </>
      );
    }
  };

  return (
    <div className="min-h-screen bg-soft-pink flex flex-col font-parastoo">
      <CheckOutHeader />

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Left Side (Delivery Steps) - Hidden on mobile, shown on larger screens */}
        <div className="hidden lg:block lg:w-[40%] bg-soft-pink p-4 lg:p-6 lg:pl-24 flex items-center justify-center pt-8">
          <div className="sticky top-20 w-full">
            <DeliverySteps />
          </div>
        </div>

        {/* Right Side (Form Sections) */}
        <div className="w-full lg:w-[60%] overflow-y-auto overflow-x-visible slim-scrollbar px-4 sm:px-6 md:px-8 lg:px-12 lg:pr-24 lg:pl-12 py-4 sm:py-6 lg:py-8 bg-soft-pink">
          <div className="max-w-4xl xl:max-5xl mx-auto space-y-6 lg:space-y-8 overflow-visible">
            <ProgressBar currentStep={currentStep} />
            {/* Step Content */}
            <div className="space-y-4 sm:space-y-6 transition-opacity duration-300">
              {currentStep === 1 && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex justify-end mb-4">
                    {cartItems &&
                      cartItems.filter(
                        (item) => item?.category === "decoration"
                      ).length === 0 && (
                        <button
                          onClick={goToNextStep}
                          disabled={isLoading}
                          className="px-3 sm:px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 border border-gray-300 hover:border-gray-400 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Skip
                        </button>
                      )}
                  </div>

                  <div className="text-center mb-6 sm:mb-8">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-600 mb-2 sm:mb-4">
                      Complete Your Celebration
                    </h2>
                    <p className="text-base sm:text-lg italic text-gray-500 mb-4 sm:mb-6 px-4">
                      "Special bundle prices just for our cake customers"
                    </p>
                    <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6 px-4">
                      <div className="h-px bg-gray-300 flex-1 max-w-16 sm:max-w-20"></div>
                      <span className="text-xs sm:text-sm italic text-gray-400 px-2 sm:px-4 whitespace-nowrap">
                        exclusive offers
                      </span>
                      <div className="h-px bg-gray-300 flex-1 max-w-16 sm:max-w-20"></div>
                    </div>
                  </div>

                  <div className="w-full overflow-visible min-h-[200px]">
                    <Decorations onAddToCart={handleShowSavingsPopup} />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <OrderReview
                  cartItems={transformedCartItems}
                  onTotalChange={setCartTotal}
                />
              )}

              {currentStep === 3 && (
                <>
                  {/* Address Status Indicator */}
                  {user && (
                    <div className="mb-4">
                      {hasAddress(user.uid) ? (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-green-700 font-medium">
                              Using saved delivery address
                            </span>
                          </div>
                          <p className="text-xs text-green-600 mt-1 ml-4">
                            {getFormattedAddress(user.uid)}
                          </p>
                        </div>
                      ) : (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-sm text-blue-700 font-medium">
                              No saved address found
                            </span>
                          </div>
                          <p className="text-xs text-blue-600 mt-1 ml-4">
                            You can save your address in your profile for faster
                            checkout
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  <h3
                    className="text-xl sm:text-2xl font-bold mb-4"
                    style={{ color: "rgba(79,79,79,0.66)" }}
                  >
                    Personal Details and Delivery Address
                  </h3>

                  <AddressSection
                    userProfile={userProfile}
                    shippingAddress={shippingAddress}
                    onShippingChange={handleShippingChange}
                    isEditing={isEditing}
                    onEditToggle={handleToggleEdit}
                    onFieldChange={handleFieldChange}
                  />

                  <BillingSection
                    billingDetails={billingAddress}
                    onBillingChange={handleBillingChange}
                    sameAsShipping={sameAsShipping}
                    onSameAsShippingChange={handleSameAsShippingChange}
                  />

                  {/* Delivery Date & Time Section */}
                  <div className="space-y-6">
                    {/* Date Picker */}
                    <div className="relative font-parastoo" ref={calendarRef}>
                      <label className="block text-sm font-medium text-[rgba(79,79,79,0.66)] mb-3">
                        Delivery Date (Preferred)*
                      </label>
                      <div
                        className="w-full px-4 py-3 border border-gray-300 bg-white focus-within:border-[rgba(224,99,99,0.85)] text-sm text-gray-700 cursor-pointer flex items-center justify-between rounded-lg hover:border-[rgba(224,99,99,0.5)] transition-colors"
                        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                      >
                        <span
                          className={
                            deliveryDate ? "text-gray-700" : "text-gray-400"
                          }
                        >
                          {deliveryDate
                            ? formatDate(deliveryDate)
                            : "Select Date"}
                        </span>
                        <Calendar className="w-5 h-5 text-gray-400" />
                      </div>

                      {isCalendarOpen && (
                        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 w-full min-w-[300px] p-4">
                          {/* Calendar Header */}
                          <div className="flex items-center justify-between mb-4">
                            <button
                              type="button"
                              onClick={() => navigateMonth(-1)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 19l-7-7 7-7"
                                />
                              </svg>
                            </button>
                            <h3 className="text-lg font-semibold text-gray-800">
                              {monthNames[currentMonth.getMonth()]}{" "}
                              {currentMonth.getFullYear()}
                            </h3>
                            <button
                              type="button"
                              onClick={() => navigateMonth(1)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </button>
                          </div>

                          {/* Day Headers */}
                          <div className="grid grid-cols-7 gap-1 mb-2">
                            {dayNames.map((day) => (
                              <div
                                key={day}
                                className="text-center text-xs font-medium text-gray-500 py-2"
                              >
                                {day}
                              </div>
                            ))}
                          </div>

                          {/* Calendar Days */}
                          <div className="grid grid-cols-7 gap-1">
                            {generateCalendarDays().map((day, index) => (
                              <button
                                key={index}
                                type="button"
                                onClick={() =>
                                  !day.isPastDate &&
                                  handleDateSelect(day.dateString)
                                }
                                disabled={day.isPastDate}
                                className={`
                                  p-2 text-sm rounded transition-colors duration-200
                                  ${
                                    !day.isCurrentMonth
                                      ? "text-gray-300 cursor-not-allowed"
                                      : day.isPastDate
                                      ? "text-gray-300 cursor-not-allowed"
                                      : day.isSelected
                                      ? "bg-[rgba(224,99,99,0.85)] text-white font-semibold"
                                      : day.isToday
                                      ? "bg-[rgba(224,99,99,0.1)] text-[rgba(224,99,99,0.85)] font-semibold border border-[rgba(224,99,99,0.85)]"
                                      : "text-gray-700 hover:bg-[rgba(224,99,99,0.1)] hover:text-[rgba(224,99,99,0.85)]"
                                  }
                                `}
                              >
                                {day.day}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Time Picker */}
                    <div className="relative font-parastoo" ref={timeRef}>
                      <label className="block text-sm font-medium text-[rgba(79,79,79,0.66)] mb-3">
                        Delivery Time (Preferred)*
                      </label>
                      <div
                        className={`w-full px-4 py-3 border border-gray-300 bg-white text-sm cursor-pointer flex items-center justify-between rounded-lg hover:border-[rgba(224,99,99,0.5)] transition-colors ${
                          !deliveryDate
                            ? "opacity-50 cursor-not-allowed"
                            : "focus-within:border-[rgba(224,99,99,0.85)]"
                        }`}
                        onClick={() => {
                          if (deliveryDate) {
                            setIsTimeOpen(!isTimeOpen);
                          }
                        }}
                      >
                        <span
                          className={
                            deliveryTime ? "text-gray-700" : "text-gray-400"
                          }
                        >
                          {deliveryTime
                            ? timeSlots.find(
                                (slot) => slot.value === deliveryTime
                              )?.label
                            : deliveryDate
                            ? "Select Time"
                            : "Select date first"}
                        </span>
                        <Clock className="w-5 h-5 text-gray-400" />
                      </div>

                      {isTimeOpen && deliveryDate && (
                        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-40 w-full max-h-60 overflow-y-auto">
                          <div className="p-2">
                            <div className="text-xs text-gray-500 px-3 py-2 border-b">
                              Available delivery times
                              {deliveryDate === todayString && (
                                <span className="block text-xs text-orange-600 mt-1">
                                  Times shown are 1+ hours from now for same-day
                                  delivery
                                </span>
                              )}
                            </div>
                            {timeSlots.map((slot) => (
                              <button
                                key={slot.value}
                                type="button"
                                onClick={() =>
                                  !slot.isDisabled &&
                                  handleTimeSelect(slot.value)
                                }
                                disabled={slot.isDisabled}
                                className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                                  slot.isDisabled
                                    ? "text-gray-300 cursor-not-allowed bg-gray-50"
                                    : deliveryTime === slot.value
                                    ? "bg-[rgba(224,99,99,0.85)] text-white font-semibold"
                                    : "text-gray-700 hover:bg-[rgba(224,99,99,0.1)] hover:text-[rgba(224,99,99,0.85)]"
                                }`}
                              >
                                {slot.label}
                                {slot.isPastTime && (
                                  <span className="text-xs ml-2 opacity-60">
                                    (Past)
                                  </span>
                                )}
                              </button>
                            ))}
                            {timeSlots.every((slot) => slot.isDisabled) && (
                              <div className="px-3 py-4 text-center text-sm text-gray-500">
                                No available time slots for today.
                                <br />
                                Please select a future date.
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Selected Date & Time Display */}
                    {(deliveryDate || deliveryTime) && (
                      <div className="bg-[rgba(224,99,99,0.1)] border border-[rgba(224,99,99,0.3)] rounded-lg p-4">
                        <h4 className="text-sm font-medium text-[rgba(79,79,79,0.66)] mb-2">
                          Selected Delivery Schedule:
                        </h4>
                        <p className="text-[rgba(224,99,99,0.85)] font-semibold">
                          {formatDisplayDateTime()}
                        </p>
                        {deliveryDate && deliveryTime && (
                          <p className="text-xs text-gray-600 mt-1">
                            We'll do our best to deliver within your preferred
                            time slot
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <h3
                    className="text-xl sm:text-2xl font-bold mb-4 mt-6 sm:mt-8"
                    style={{ color: "rgba(79,79,79,0.66)" }}
                  >
                    Payment Method
                  </h3>

                  <PaymentSection
                    paymentMethod={paymentMethod}
                    onPaymentMethodChange={(method) => {
                      setPaymentMethod(method);
                      if (method === "cod") {
                        handlePayment();
                      }
                    }}
                    onPayment={handlePayment}
                    total={cartTotal}
                    isLoading={isLoading}
                  />
                </>
              )}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 pt-4 sm:pt-6">
                {currentStep > 1 && (
                  <button
                    onClick={goToPrevStep}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 rounded-lg font-bold text-white bg-[rgba(224,99,99,0.85)] hover:bg-[rgba(224,99,99,0.65)] transition-colors duration-200 order-2 sm:order-1 w-full sm:w-auto transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                )}

                {currentStep < 3 && (
                  <button
                    onClick={goToNextStep}
                    disabled={isLoading}
                    className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-2 rounded-lg font-bold text-white transition-all duration-200 order-1 sm:order-2 w-full sm:w-auto ${
                      currentStep === 1 &&
                      (!cartItems || cartItems.length === 0)
                        ? "hidden"
                        : "block"
                    } ${currentStep === 1 ? "sm:ml-auto" : ""} ${
                      isLoading
                        ? "bg-[rgba(224,99,99,0.5)] cursor-not-allowed"
                        : "bg-[rgba(224,99,99,0.85)] hover:bg-[rgba(224,99,99,0.65)] transform hover:scale-105 active:scale-95"
                    }`}
                  >
                    {getButtonContent(currentStep)}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <OrderPopup
        isOpen={showOrderModal}
        onClose={handleCloseOrderModal}
        orderData={orderData}
      />

      <SavingsPopup
        isOpen={showSavingsPopup}
        onClose={handleCloseSavingsPopup}
        savings={savingsPopupData.savings}
        itemName={savingsPopupData.itemName}
      />
    </div>
  );
}
