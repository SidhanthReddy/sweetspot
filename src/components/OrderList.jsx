import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  Calendar,
  MapPin,
  CreditCard,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle,
  Truck,
  User,
  Star,
  Timer,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { getOrdersByUserId } from "../data/orderData";
import OrderProgressTracker from "./OrderProgressTracker";

const OrderList = () => {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [ratings, setRatings] = useState({});

  // Update current time every minute for real-time countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Fetch orders when user data is available
  useEffect(() => {
    if (!authLoading) {
      if (user) {
        // Fetch orders for the authenticated user
        const userOrders = getOrdersByUserId(user.uid);
        setOrders(userOrders);
        setIsLoading(false);
      } else {
        // User not authenticated
        setOrders([]);
        setIsLoading(false);
      }
    }
  }, [user, authLoading]);

  // Helper function to format delivery date as "25 Aug 2025"
  const formatDeliveryDate = (dateString) => {
    try {
      let date;
      if (dateString.includes("/")) {
        const parts = dateString.split("/");
        if (parts.length === 3) {
          date = new Date(parts[2], parts[1] - 1, parts[0]);
        }
      } else {
        date = new Date(dateString);
      }

      if (isNaN(date.getTime())) {
        return dateString;
      }

      const day = date.getDate();
      const month = date.toLocaleDateString("en-IN", { month: "short" });
      const year = date.getFullYear();

      return `${day} ${month} ${year}`;
    } catch (error) {
      return dateString;
    }
  };

  // Enhanced function to calculate real delivery time remaining
  const getEstimatedDeliveryTime = (order) => {
    // If already delivered
    if (order.status === 5) {
      return {
        type: "delivered",
        text: "Delivered",
        color: "text-green-600",
        icon: CheckCircle,
        fullDate: "Order completed",
      };
    }

    // Check if we have precise delivery datetime from the new checkout flow
    if (order.preciseDeliveryDateTime) {
      const deliveryDateTime = new Date(order.preciseDeliveryDateTime);
      const now = new Date();
      const timeDifference = deliveryDateTime.getTime() - now.getTime();

      // If delivery time has passed but order isn't marked as delivered
      if (timeDifference <= 0) {
        return {
          type: "overdue",
          text: "Should have arrived",
          color: "text-red-600",
          icon: AlertCircle,
          fullDate: `Expected: ${deliveryDateTime.toLocaleDateString("en-IN", {
            weekday: "short",
          })}, ${deliveryDateTime.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}`,
        };
      }

      // Calculate remaining time
      const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hoursLeft = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutesLeft = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );

      let timeText;
      let color;

      if (daysLeft > 0) {
        timeText = daysLeft === 1 ? "1 day left" : `${daysLeft} days left`;
        color = "text-blue-600";
      } else if (hoursLeft > 0) {
        if (hoursLeft === 1 && minutesLeft > 0) {
          timeText = `1h ${minutesLeft}m left`;
        } else if (hoursLeft === 1) {
          timeText = "1h left";
        } else {
          timeText = `${hoursLeft}h left`;
        }
        color = hoursLeft <= 2 ? "text-orange-600" : "text-yellow-600";
      } else if (minutesLeft > 0) {
        timeText = minutesLeft === 1 ? "1m left" : `${minutesLeft}m left`;
        color = "text-red-500";
      } else {
        timeText = "Any moment now";
        color = "text-red-600";
      }

      return {
        type: daysLeft > 0 ? "days" : "hours",
        text: timeText,
        color: color,
        icon: Timer,
        fullDate: `${deliveryDateTime.toLocaleDateString("en-IN", {
          weekday: "short",
        })}, ${deliveryDateTime.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}`,
      };
    }

    // Fallback for old orders without precise delivery datetime
    // Try to parse from existing delivery date and time
    if (order.selectedDeliveryDate && order.selectedDeliveryTime) {
      try {
        const [year, month, day] = order.selectedDeliveryDate
          .split("-")
          .map((num) => parseInt(num));
        const [hours, minutes] = order.selectedDeliveryTime
          .split(":")
          .map((num) => parseInt(num));

        const deliveryDateTime = new Date(year, month - 1, day, hours, minutes);
        const now = new Date();
        const timeDifference = deliveryDateTime.getTime() - now.getTime();

        if (timeDifference <= 0) {
          return {
            type: "overdue",
            text: "Should have arrived",
            color: "text-red-600",
            icon: AlertCircle,
            fullDate: `Expected: ${deliveryDateTime.toLocaleDateString(
              "en-IN",
              {
                weekday: "short",
              }
            )}, ${order.selectedTimeSlot || order.selectedDeliveryTime}`,
          };
        }

        const hoursLeft = Math.ceil(timeDifference / (1000 * 60 * 60));
        const daysLeft = Math.floor(hoursLeft / 24);

        if (daysLeft > 0) {
          return {
            type: "days",
            text: daysLeft === 1 ? "1 day left" : `${daysLeft} days left`,
            color: "text-blue-600",
            icon: Timer,
            fullDate: `${deliveryDateTime.toLocaleDateString("en-IN", {
              weekday: "short",
            })}, ${order.selectedTimeSlot || order.selectedDeliveryTime}`,
          };
        } else {
          return {
            type: "hours",
            text: hoursLeft === 1 ? "1h left" : `${hoursLeft}h left`,
            color: hoursLeft <= 2 ? "text-orange-600" : "text-yellow-600",
            icon: Timer,
            fullDate: `Today, ${
              order.selectedTimeSlot || order.selectedDeliveryTime
            }`,
          };
        }
      } catch (error) {
        console.error("Error parsing delivery datetime:", error);
      }
    }

    // Ultimate fallback - generic delivery time
    return {
      type: "estimated",
      text: "Processing",
      color: "text-gray-600",
      icon: Clock,
      fullDate: order.estimatedDelivery || "TBD",
    };
  };

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "Order Confirmed";
      case 2:
        return "Baking in Progress";
      case 3:
        return "Quality Check";
      case 4:
        return "Out for Delivery";
      case 5:
        return "Delivered";
      default:
        return "Unknown";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return "text-blue-600 bg-blue-100 border-blue-200";
      case 2:
        return "text-yellow-600 bg-yellow-100 border-yellow-200";
      case 3:
        return "text-orange-600 bg-orange-100 border-orange-200";
      case 4:
        return "text-purple-600 bg-purple-100 border-purple-200";
      case 5:
        return "text-green-600 bg-green-100 border-green-200";
      default:
        return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 1:
        return Package;
      case 2:
        return Clock;
      case 3:
        return Clock;
      case 4:
        return Truck;
      case 5:
        return CheckCircle;
      default:
        return Package;
    }
  };

  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getProgressPercentage = (status) => {
    return (status / 5) * 100;
  };

  // Format price to ensure visibility
  const formatPrice = (amount) => {
    if (typeof amount === "string") {
      const cleanAmount = amount.replace(/[₹,]/g, "");
      const numericAmount = parseFloat(cleanAmount);

      if (isNaN(numericAmount)) {
        return amount;
      }

      return `₹${numericAmount.toLocaleString("en-IN")}`;
    }

    if (typeof amount === "number") {
      return `₹${amount.toLocaleString("en-IN")}`;
    }

    return amount;
  };

  // Loading state
  if (authLoading || isLoading) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgba(224,99,99,0.85)] mx-auto mb-4"></div>
            <p className="text-[rgba(79,79,79,0.6)] font-parastoo">
              Loading your orders...
            </p>
          </div>
        </div>
      </>
    );
  }

  // User not authenticated
  else if (!user) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 py-8 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-3xl border border-rose-200 shadow-[0_4px_20px_rgba(244,63,94,0.1)] p-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-[rgba(79,79,79,0.7)] font-parastoo mb-4">
                Please Log In
              </h2>
              <p className="text-[rgba(79,79,79,0.6)] font-parastoo mb-6">
                You need to be logged in to view your orders.
              </p>
              <button
                onClick={() => navigate("/login")}
                className="px-8 py-3 bg-[rgba(224,99,99,0.85)] text-white rounded-xl font-semibold font-parastoo hover:bg-[rgba(224,99,99,0.95)] transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 py-8 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[rgba(79,79,79,0.7)] font-parastoo mb-4">
              Your Orders
            </h1>
            <p className="text-lg text-[rgba(79,79,79,0.6)] font-parastoo max-w-2xl mx-auto">
              Track your sweet deliveries and stay updated with real-time
              progress
            </p>
            {user && (
              <p className="text-sm text-[rgba(79,79,79,0.5)] font-parastoo mt-2">
                Welcome back, {user.displayName || user.email}!
              </p>
            )}
          </div>

          {/* Orders List */}
          <div className="space-y-6">
            {orders.map((order) => {
              const StatusIcon = getStatusIcon(order.status);
              const isExpanded = expandedOrder === order.id;
              const deliveryTime = getEstimatedDeliveryTime(order);
              const DeliveryIcon = deliveryTime.icon;

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl border border-rose-200 shadow-[0_4px_20px_rgba(244,63,94,0.1)] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(244,63,94,0.15)]"
                >
                  {/* Order Header */}
                  <div className="p-8">
                    <div className="flex flex-col lg:flex-row gap-6 items-start">
                      {/* Order Image */}
                      <div className="flex-shrink-0">
                        <img
                          draggable="false"
                          src={order.image}
                          alt={order.cakeName}
                          className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl object-cover shadow-md"
                        />
                      </div>

                      {/* Order Info */}
                      <div className="flex-1 space-y-4">
                        {/* Order ID and Status */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-bold text-[rgba(79,79,79,0.7)] font-parastoo mb-1">
                              Order #{order.id}
                            </h3>
                            <p className="text-[rgba(79,79,79,0.6)] font-parastoo">
                              {order.customerName}
                            </p>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-2">
                            <div
                              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border font-semibold font-parastoo ${getStatusColor(
                                order.status
                              )}`}
                            >
                              <StatusIcon className="w-4 h-4" />
                              {getStatusText(order.status)}
                            </div>

                            {/* Enhanced Delivery Time Badge */}
                            <div
                              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border font-semibold font-parastoo bg-white border-gray-200 ${
                                deliveryTime.color
                              } ${
                                deliveryTime.type === "overdue"
                                  ? "animate-pulse"
                                  : ""
                              }`}
                            >
                              <DeliveryIcon
                                className={`w-4 h-4 ${
                                  deliveryTime.type === "overdue"
                                    ? "animate-bounce"
                                    : ""
                                }`}
                              />
                              {deliveryTime.text}
                            </div>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[rgba(224,99,99,0.85)] h-2 rounded-full transition-all duration-500"
                            style={{
                              width: `${getProgressPercentage(order.status)}%`,
                            }}
                          />
                        </div>

                        {/* Order Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          {/* Cake Details */}
                          <div className="flex items-center gap-3">
                            <Package className="w-5 h-5 text-[rgba(224,99,99,0.85)]" />
                            <div>
                              <p className="text-sm text-[rgba(79,79,79,0.6)] font-parastoo">
                                Cake
                              </p>
                              <p className="font-semibold text-[rgba(79,79,79,0.7)] font-parastoo">
                                {order.cakeName}
                              </p>
                            </div>
                          </div>

                          {/* Delivery Date - Enhanced */}
                          <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-[rgba(224,99,99,0.85)]" />
                            <div>
                              <p className="text-sm text-[rgba(79,79,79,0.6)] font-parastoo">
                                Delivery
                              </p>
                              <p className="font-semibold text-[rgba(79,79,79,0.7)] font-parastoo">
                                {order.selectedDeliveryDate
                                  ? formatDeliveryDate(
                                      new Date(
                                        order.selectedDeliveryDate
                                          .split("-")
                                          .join("/")
                                      ).toLocaleDateString()
                                    )
                                  : formatDeliveryDate(order.deliveryDate)}
                              </p>
                            </div>
                          </div>

                          {/* Estimated Time - Enhanced with day and time only */}
                          <div className="flex items-center gap-3">
                            <Timer className="w-5 h-5 text-[rgba(224,99,99,0.85)]" />
                            <div>
                              <p className="text-sm text-[rgba(79,79,79,0.6)] font-parastoo">
                                Est. Time
                              </p>
                              <p
                                className={`font-semibold font-parastoo text-sm ${deliveryTime.color}`}
                              >
                                {deliveryTime.fullDate}
                              </p>
                            </div>
                          </div>

                          {/* Amount */}
                          <div className="flex items-center gap-3">
                            <CreditCard className="w-5 h-5 text-[rgba(224,99,99,0.85)]" />
                            <div>
                              <p className="text-sm text-[rgba(79,79,79,0.6)] font-parastoo">
                                Total
                              </p>
                              <p className="font-bold text-[rgba(224,99,99,0.85)] font-parastoo text-lg">
                                {formatPrice(order.amount)}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Address */}
                        <div className="flex items-center gap-3 pt-2">
                          <MapPin className="w-5 h-5 text-[rgba(224,99,99,0.85)]" />
                          <div>
                            <p className="text-sm text-[rgba(79,79,79,0.6)] font-parastoo">
                              Delivery Address
                            </p>
                            <p className="text-[rgba(79,79,79,0.7)] font-parastoo">
                              {order.address}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="flex-shrink-0">
                        <button
                          className="flex items-center gap-2 px-6 py-3 bg-[rgba(224,99,99,0.85)] text-white rounded-xl font-semibold font-parastoo hover:bg-[rgba(224,99,99,0.95)] transition-all duration-200 shadow-md hover:shadow-lg"
                          onClick={() => toggleExpand(order.id)}
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="w-5 h-5" />
                              Hide Details
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-5 h-5" />
                              View Details
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content - Enhanced with real-time data */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 bg-gray-50 p-8">
                      {/* Order Progress Tracker */}
                      <div className="mb-8">
                        <OrderProgressTracker currentStatus={order.status} />
                      </div>

                      {/* Enhanced Delivery Timing Section */}
                      {(order.preciseDeliveryDateTime ||
                        (order.selectedDeliveryDate &&
                          order.selectedDeliveryTime)) && (
                        <div className="mb-6 bg-white rounded-2xl p-6 border border-gray-200">
                          <h5 className="font-bold text-[rgba(79,79,79,0.7)] font-parastoo mb-4 flex items-center gap-2">
                            <Timer className="w-5 h-5 text-[rgba(224,99,99,0.85)]" />
                            Real-time Delivery Tracking
                          </h5>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-[rgba(79,79,79,0.6)] font-parastoo">
                                Time Remaining:
                              </span>
                              <span
                                className={`font-bold font-parastoo text-lg ${deliveryTime.color}`}
                              >
                                {deliveryTime.text}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[rgba(79,79,79,0.6)] font-parastoo">
                                Scheduled Delivery:
                              </span>
                              <span className="font-semibold text-[rgba(79,79,79,0.7)] font-parastoo">
                                {deliveryTime.fullDate}
                              </span>
                            </div>
                            {order.selectedTimeSlot && (
                              <div className="flex justify-between">
                                <span className="text-[rgba(79,79,79,0.6)] font-parastoo">
                                  Time Slot:
                                </span>
                                <span className="font-semibold text-[rgba(79,79,79,0.7)] font-parastoo">
                                  {order.selectedTimeSlot}
                                </span>
                              </div>
                            )}
                            {deliveryTime.type === "overdue" && (
                              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-3">
                                <div className="flex items-center gap-2">
                                  <AlertCircle className="w-4 h-4 text-red-600" />
                                  <span className="text-sm text-red-700 font-medium">
                                    Delivery time has passed - please contact
                                    support if you haven't received your order
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Additional Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Order Details */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-200">
                          <h5 className="font-bold text-[rgba(79,79,79,0.7)] font-parastoo mb-4">
                            Order Details
                          </h5>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-[rgba(79,79,79,0.6)] font-parastoo">
                                Order Placed:
                              </span>
                              <span className="font-semibold text-[rgba(79,79,79,0.7)] font-parastoo">
                                {order.orderDate}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[rgba(79,79,79,0.6)] font-parastoo">
                                Expected Delivery:
                              </span>
                              <span className="font-semibold text-[rgba(79,79,79,0.7)] font-parastoo">
                                {order.expectedDelivery ||
                                  deliveryTime.fullDate}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[rgba(79,79,79,0.6)] font-parastoo">
                                Current Status:
                              </span>
                              <span
                                className={`font-semibold font-parastoo ${deliveryTime.color}`}
                              >
                                {getStatusText(order.status)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[rgba(79,79,79,0.6)] font-parastoo">
                                Payment Method:
                              </span>
                              <span className="font-semibold text-[rgba(79,79,79,0.7)] font-parastoo">
                                {order.paymentMethod}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[rgba(79,79,79,0.6)] font-parastoo">
                                Order Total:
                              </span>
                              <span className="font-bold text-[rgba(224,99,99,0.85)] font-parastoo text-lg">
                                {formatPrice(order.amount)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[rgba(79,79,79,0.6)] font-parastoo">
                                Contact:
                              </span>
                              <span className="font-semibold text-[rgba(79,79,79,0.7)] font-parastoo">
                                {order.phone}
                              </span>
                            </div>
                            {order.specialInstructions && (
                              <div className="pt-2 border-t border-gray-100">
                                <span className="text-[rgba(79,79,79,0.6)] font-parastoo">
                                  Special Instructions:
                                </span>
                                <p className="font-semibold text-[rgba(79,79,79,0.7)] font-parastoo mt-1">
                                  {order.specialInstructions}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Contact Support */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-200">
                          <h5 className="font-bold text-[rgba(79,79,79,0.7)] font-parastoo mb-4">
                            Need Help?
                          </h5>
                          <div className="space-y-3">
                            <button
                              onClick={() => {
                                navigate("/contact-us");
                                window.scrollTo(0, 0);
                              }}
                              className="w-full px-4 py-2 border-2 border-[rgba(224,99,99,0.85)] text-[rgba(224,99,99,0.85)] rounded-lg font-semibold font-parastoo hover:bg-[rgba(224,99,99,0.85)] hover:text-white transition-all duration-200"
                            >
                              Contact Support
                            </button>
                            <p className="text-sm text-[rgba(79,79,79,0.6)] font-parastoo text-center">
                              Having issues with your order? We're here to help!
                            </p>
                          </div>
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <h6 className="font-bold text-[rgba(79,79,79,0.7)] font-parastoo mb-3 text-center">
                              Rate this Cake!
                            </h6>
                            <div className="flex justify-center space-x-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  onClick={() =>
                                    setRatings((prev) => ({
                                      ...prev,
                                      [order.id]: star,
                                    }))
                                  }
                                  className="transition-all duration-200 hover:scale-110 p-1"
                                >
                                  <Star
                                    size={28}
                                    className={`${
                                      (ratings[order.id] || 0) >= star
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-gray-300 hover:text-gray-400"
                                    } transition-colors duration-200`}
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {orders.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-[rgba(79,79,79,0.7)] font-parastoo mb-2">
                No Orders Found
              </h3>
              <p className="text-[rgba(79,79,79,0.6)] font-parastoo mb-6">
                You haven't placed any orders yet. Start exploring our delicious
                cakes!
              </p>
              <button
                onClick={() => navigate("/")}
                className="px-8 py-3 bg-[rgba(224,99,99,0.85)] text-white rounded-xl font-semibold font-parastoo hover:bg-[rgba(224,99,99,0.95)] transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Browse Cakes
              </button>
            </div>
          )}

          {/* Order Summary Stats */}
          {orders.length > 0 && (
            <div className="bg-white rounded-3xl border border-rose-200 shadow-[0_4px_20px_rgba(244,63,94,0.1)] p-8">
              <h2 className="text-2xl font-bold text-[rgba(79,79,79,0.7)] font-parastoo mb-6 text-center">
                Order Summary
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Package className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-[rgba(79,79,79,0.7)] font-parastoo">
                    {orders.length}
                  </p>
                  <p className="text-sm text-[rgba(79,79,79,0.6)] font-parastoo">
                    Total Orders
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-8 h-8 text-yellow-600" />
                  </div>
                  <p className="text-2xl font-bold text-[rgba(79,79,79,0.7)] font-parastoo">
                    {orders.filter((order) => order.status < 5).length}
                  </p>
                  <p className="text-sm text-[rgba(79,79,79,0.6)] font-parastoo">
                    Pending
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-[rgba(79,79,79,0.7)] font-parastoo">
                    {orders.filter((order) => order.status === 5).length}
                  </p>
                  <p className="text-sm text-[rgba(79,79,79,0.6)] font-parastoo">
                    Delivered
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CreditCard className="w-8 h-8 text-rose-600" />
                  </div>
                  <p className="text-2xl font-bold text-[rgba(224,99,99,0.85)] font-parastoo">
                    {formatPrice(
                      orders.reduce((sum, order) => {
                        const amount =
                          typeof order.amount === "string"
                            ? parseFloat(order.amount.replace(/[₹,]/g, ""))
                            : order.amount;
                        return sum + (isNaN(amount) ? 0 : amount);
                      }, 0)
                    )}
                  </p>
                  <p className="text-sm text-[rgba(79,79,79,0.6)] font-parastoo">
                    Total Spent
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderList;
