// data/orderData.js

// Helper function to create realistic delivery dates and times
const createDeliveryDateTime = (daysFromNow, hour = 14, minute = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  date.setHours(hour, minute, 0, 0);
  return date;
};

// Helper function to format date as YYYY-MM-DD
const formatDateString = (date) => {
  return date.toISOString().split("T")[0];
};

// Helper function to format time as HH:MM
const formatTimeString = (date) => {
  return date.toTimeString().split(":").slice(0, 2).join(":");
};

// Mock order data organized by user ID with enhanced delivery tracking
const ordersData = {};

// Service functions to interact with order data

/**
 * Get all orders for a specific user
 * @param {string} userId - The user ID to fetch orders for
 * @returns {Array} Array of order objects for the user
 */
export const getOrdersByUserId = (userId) => {
  if (!userId) {
    console.warn("No userId provided to getOrdersByUserId");
    return [];
  }

  return ordersData[userId] || [];
};

/**
 * Get a specific order by order ID and user ID
 * @param {string} orderId - The order ID to fetch
 * @param {string} userId - The user ID (for security)
 * @returns {Object|null} Order object or null if not found
 */
export const getOrderById = (orderId, userId) => {
  if (!userId || !orderId) {
    console.warn("Missing userId or orderId in getOrderById");
    return null;
  }

  const userOrders = ordersData[userId] || [];
  return userOrders.find((order) => order.id === orderId) || null;
};

/**
 * Get orders by status for a specific user
 * @param {string} userId - The user ID
 * @param {number} status - The status to filter by (1-5)
 * @returns {Array} Array of orders with the specified status
 */
export const getOrdersByStatus = (userId, status) => {
  if (!userId) {
    console.warn("No userId provided to getOrdersByStatus");
    return [];
  }

  const userOrders = ordersData[userId] || [];
  return userOrders.filter((order) => order.status === status);
};

/**
 * Get recent orders for a specific user
 * @param {string} userId - The user ID
 * @param {number} limit - Maximum number of orders to return (default: 5)
 * @returns {Array} Array of recent orders
 */
export const getRecentOrders = (userId, limit = 5) => {
  if (!userId) {
    console.warn("No userId provided to getRecentOrders");
    return [];
  }

  const userOrders = ordersData[userId] || [];
  // Sort by order creation timestamp (most recent first) and limit results
  return userOrders
    .sort((a, b) => {
      const dateA = a.orderCreatedAt
        ? new Date(a.orderCreatedAt)
        : new Date(a.orderDate);
      const dateB = b.orderCreatedAt
        ? new Date(b.orderCreatedAt)
        : new Date(b.orderDate);
      return dateB - dateA;
    })
    .slice(0, limit);
};

/**
 * Enhanced addOrder function with duplicate prevention
 * @param {string} userId - The user ID
 * @param {Object} orderData - The order data to add (from checkout page)
 * @returns {Object} The created order with generated ID
 */
export const addOrder = (userId, orderData) => {
  console.log("Adding order for user:", userId);
  
  if (!userId || !orderData) {
    console.warn("Missing userId or orderData in addOrder");
    return null;
  }

  // Initialize user's order array if it doesn't exist
  if (!ordersData[userId]) {
    ordersData[userId] = [];
  }

  // Check for duplicate orders by comparing order creation time and content
  const orderCreatedAt = orderData.orderCreatedAt || new Date().toISOString();
  const existingOrders = ordersData[userId];
  
  // Check if an order with the same creation time and total already exists (within 5 seconds)
  const recentDuplicate = existingOrders.find(order => {
    const timeDiff = Math.abs(new Date(order.orderCreatedAt) - new Date(orderCreatedAt));
    const sameTotal = Math.abs((order.total || 0) - (orderData.total || 0)) < 0.01;
    const sameCustomer = order.customerName === orderData.customerName;
    
    return timeDiff < 5000 && sameTotal && sameCustomer; // Within 5 seconds
  });

  if (recentDuplicate) {
    console.warn("Duplicate order detected, returning existing order:", recentDuplicate.id);
    return recentDuplicate;
  }

  // Generate unique order ID using timestamp + random component
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 5);
  const orderCount = Object.values(ordersData).flat().length + 1;
  const orderId = `SW2025-${orderCount.toString().padStart(3, "0")}`;

  // Create the new order with enhanced structure matching checkout page
  const newOrder = {
    // Basic order info
    id: orderId,
    userId: userId,

    // Customer information (from checkout)
    customerName: orderData.customerName || "",
    email: orderData.email || "",
    phone: orderData.phone || "",

    // Addresses (from checkout)
    shippingAddress: orderData.shippingAddress || "",
    billingAddress: orderData.billingAddress || "",

    // Payment info
    paymentMethod: orderData.paymentMethod || "Unknown",

    // Cart and pricing
    cartItems: orderData.cartItems || [],
    total: orderData.total || 0,
    amount: orderData.amount || `₹${orderData.total || 0}`,

    // Order timing
    orderDate: orderData.orderDate || new Date().toLocaleDateString(),
    orderCreatedAt: orderCreatedAt,

    // Enhanced delivery tracking data (from checkout page)
    deliveryDate: orderData.deliveryDate || "",
    deliveryTime: orderData.deliveryTime || "",
    deliveryDateTime: orderData.deliveryDateTime || "",
    selectedDeliveryDate: orderData.selectedDeliveryDate || "",
    selectedDeliveryTime: orderData.selectedDeliveryTime || "",
    preciseDeliveryDateTime: orderData.preciseDeliveryDateTime || "",
    selectedTimeSlot: orderData.selectedTimeSlot || "",
    estimatedDelivery: orderData.estimatedDelivery || "",

    // Order status and details
    status: orderData.status || 1, // Default to "Order Confirmed"
    cakeName:
      orderData.cakeName ||
      (orderData.cartItems && orderData.cartItems.length > 0
        ? orderData.cartItems[0].name
        : "Custom Order"),
    address: orderData.address || orderData.shippingAddress || "",
    image:
      orderData.image ||
      (orderData.cartItems && orderData.cartItems.length > 0
        ? orderData.cartItems[0].imageURL || orderData.cartItems[0].image
        : ""),
    specialInstructions: orderData.specialInstructions || "",

    // Enhanced customer and address details (from checkout page)
    customerDetails: orderData.customerDetails || {
      userId: userId,
      displayName: orderData.customerName || "",
      email: orderData.email || "",
      phoneNumber: orderData.phone || "",
      emailVerified: false,
    },

    addressDetails: orderData.addressDetails || {
      shipping: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        latitude: null,
        longitude: null,
        coordinates: null,
      },
      billing: {
        name: orderData.customerName || "",
        email: orderData.email || "",
        phone: orderData.phone || "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
      },
      hasSavedAddress: false,
      addressLastUpdated: null,
    },
  };

  // Add the order to the user's order list
  ordersData[userId].push(newOrder);

  console.log(`Order ${orderId} created successfully for user ${userId}`);

  return newOrder;
};

/**
 * Update order status
 * @param {string} orderId - The order ID to update
 * @param {string} userId - The user ID (for security)
 * @param {number} newStatus - The new status (1-5)
 * @returns {boolean} Success status
 */
export const updateOrderStatus = (orderId, userId, newStatus) => {
  if (!orderId || !userId || !newStatus) {
    console.warn("Missing required parameters in updateOrderStatus");
    return false;
  }

  const userOrders = ordersData[userId] || [];
  const orderIndex = userOrders.findIndex((order) => order.id === orderId);

  if (orderIndex === -1) {
    console.warn(`Order ${orderId} not found for user ${userId}`);
    return false;
  }

  ordersData[userId][orderIndex].status = newStatus;
  console.log(`Order ${orderId} status updated to ${newStatus}`);
  return true;
};

/**
 * Get orders that are due for delivery soon (within next 2 hours)
 * @param {string} userId - The user ID
 * @returns {Array} Array of orders due for delivery
 */
export const getOrdersDueSoon = (userId) => {
  if (!userId) {
    console.warn("No userId provided to getOrdersDueSoon");
    return [];
  }

  const userOrders = ordersData[userId] || [];
  const twoHoursFromNow = new Date(Date.now() + 2 * 60 * 60 * 1000);

  return userOrders.filter((order) => {
    if (order.status === 5 || !order.preciseDeliveryDateTime) return false;

    const deliveryTime = new Date(order.preciseDeliveryDateTime);
    return deliveryTime <= twoHoursFromNow && deliveryTime > new Date();
  });
};

/**
 * Get overdue orders (delivery time has passed but not marked as delivered)
 * @param {string} userId - The user ID
 * @returns {Array} Array of overdue orders
 */
export const getOverdueOrders = (userId) => {
  if (!userId) {
    console.warn("No userId provided to getOverdueOrders");
    return [];
  }

  const userOrders = ordersData[userId] || [];
  const now = new Date();

  return userOrders.filter((order) => {
    if (order.status === 5 || !order.preciseDeliveryDateTime) return false;

    const deliveryTime = new Date(order.preciseDeliveryDateTime);
    return deliveryTime < now;
  });
};

/**
 * Get delivery statistics for a user
 * @param {string} userId - The user ID
 * @returns {Object} Statistics object
 */
export const getDeliveryStats = (userId) => {
  if (!userId) {
    console.warn("No userId provided to getDeliveryStats");
    return {
      total: 0,
      pending: 0,
      delivered: 0,
      overdue: 0,
      dueToday: 0,
    };
  }

  const userOrders = ordersData[userId] || [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const stats = {
    total: userOrders.length,
    pending: userOrders.filter((order) => order.status < 5).length,
    delivered: userOrders.filter((order) => order.status === 5).length,
    overdue: getOverdueOrders(userId).length,
    dueToday: userOrders.filter((order) => {
      if (!order.preciseDeliveryDateTime) return false;
      const deliveryDate = new Date(order.preciseDeliveryDateTime);
      return deliveryDate >= today && deliveryDate < tomorrow;
    }).length,
  };

  return stats;
};

// Export the raw data for development/testing purposes
export const getAllOrdersData = () => ordersData;

// Export order status constants
export const ORDER_STATUS = {
  CONFIRMED: 1,
  BAKING: 2,
  QUALITY_CHECK: 3,
  OUT_FOR_DELIVERY: 4,
  DELIVERED: 5,
};

// Export default
export default {
  getOrdersByUserId,
  getOrderById,
  getOrdersByStatus,
  getRecentOrders,
  addOrder,
  updateOrderStatus,
  getOrdersDueSoon,
  getOverdueOrders,
  getDeliveryStats,
  getAllOrdersData,
  ORDER_STATUS,
};