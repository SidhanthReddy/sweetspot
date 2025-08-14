// data/orderData.js

// Mock order data organized by user ID
const ordersData = {
  // User 1 orders
  "iT3WaxAgG0cHuxI9JmThKcfvNG63": [
    { 
      id: "SW2025-001", //randomly generated ID
      userId: "iT3WaxAgG0cHuxI9JmThKcfvNG63", //default
      customerName: "Priya Sharma", //defau;t
      cakeName: "Chocolate Truffle Delight", //pawan
      deliveryDate: "Today, July 26th", 
      amount: "₹2,850", //pawan
      status: 3, 
      address: "Koramangala, Bangalore", //pawan
      weight: "1.5 kg", //paewan
      eggType: "Eggless", //pawan
      image: "https://plus.unsplash.com/premium_photo-1715015439764-1e8d37d5c6c9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNha2VzfGVufDB8fDB8fHww",
      orderDate: "July 24, 2:30 PM",
      expectedDelivery: "July 26, 6:00 PM",
      phone: "+91 98765 43210", //pawan
      paymentMethod: "UPI", //pawan
      specialInstructions: "Please deliver after 5 PM" ,//message
      decorationItem: 1, //pawan
      decorationQuantity: 2 //pawan
    },
    { 
      id: "SW2025-005", 
      userId: "iT3WaxAgG0cHuxI9JmThKcfvNG63",
      customerName: "Priya Sharma", 
      cakeName: "Strawberry Shortcake", 
      deliveryDate: "July 28th", 
      amount: "₹1,750", 
      status: 1, 
      address: "Koramangala, Bangalore",
      weight: "1.5 kg",
      eggType: "Eggless",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3RyYXdiZXJyeSUyMGNha2V8ZW58MHx8MHx8fDA%3D",
      orderDate: "July 25, 11:15 AM",
      expectedDelivery: "July 28, 4:00 PM",
      phone: "+91 98765 43210",
      paymentMethod: "Credit Card",
      specialInstructions: "Birthday cake for 8-year-old",
      decorationItem: 1,
      decorationQuantity: 2
    }
  ],

  // User 2 orders
  "user456": [
    { 
      id: "SW2025-002", 
      userId: "user456",
      customerName: "Rajesh Kumar", 
      cakeName: "Vanilla Bean Celebration", 
      deliveryDate: "Tomorrow, July 27th", 
      amount: "₹1,950", 
      status: 2, 
      address: "Indiranagar, Bangalore",
      image: "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNha2VzfGVufDB8fDB8fHww",
      orderDate: "July 24, 9:45 AM",
      expectedDelivery: "July 27, 3:00 PM",
      phone: "+91 87654 32109",
      paymentMethod: "Cash on Delivery",
      specialInstructions: "Call before delivery"
    },
    { 
      id: "SW2025-006", 
      userId: "user456",
      customerName: "Rajesh Kumar", 
      cakeName: "Mango Mousse Cake", 
      deliveryDate: "July 30th", 
      amount: "₹2,650", 
      status: 5, 
      address: "Indiranagar, Bangalore",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFuZ28lMjBjYWtlfGVufDB8fDB8fHww",
      orderDate: "July 22, 3:20 PM",
      expectedDelivery: "July 30, 5:00 PM",
      phone: "+91 87654 32109",
      paymentMethod: "UPI",
      specialInstructions: "Delivered successfully"
    }
  ],

  // User 3 orders
  "user789": [
    { 
      id: "SW2025-003", 
      userId: "user789",
      customerName: "Anita Singh", 
      cakeName: "Red Velvet Supreme", 
      deliveryDate: "July 29th", 
      amount: "₹3,200", 
      status: 4, 
      address: "HSR Layout, Bangalore",
      image: "https://plus.unsplash.com/premium_photo-1713447395823-2e0b40b75a89?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FrZXN8ZW58MHx8MHx8fDA%3D",
      orderDate: "July 25, 1:10 PM",
      expectedDelivery: "July 29, 7:00 PM",
      phone: "+91 76543 21098",
      paymentMethod: "Debit Card",
      specialInstructions: "Anniversary cake - handle with care"
    }
  ],

  // User 4 orders
  "user101": [
    { 
      id: "SW2025-004", 
      userId: "user101",
      customerName: "Dev Patel", 
      cakeName: "Black Forest Special", 
      deliveryDate: "July 31st", 
      amount: "₹2,400", 
      status: 1, 
      address: "Whitefield, Bangalore",
      image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNha2VzfGVufDB8fDB8fHww",
      orderDate: "July 26, 10:30 AM",
      expectedDelivery: "July 31, 2:00 PM",
      phone: "+91 65432 10987",
      paymentMethod: "Net Banking",
      specialInstructions: "Office delivery - ask for reception"
    },
    { 
      id: "SW2025-007", 
      userId: "user101",
      customerName: "Dev Patel", 
      cakeName: "Lemon Cheesecake", 
      deliveryDate: "August 2nd", 
      amount: "₹1,800", 
      status: 1, 
      address: "Whitefield, Bangalore",
      image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGVtb24lMjBjaGVlc2VjYWtlfGVufDB8fDB8fHww",
      orderDate: "July 26, 4:45 PM",
      expectedDelivery: "August 2, 1:00 PM",
      phone: "+91 65432 10987",
      paymentMethod: "UPI",
      specialInstructions: "Sugar-free version requested"
    }
  ]
};

// Service functions to interact with order data

/**
 * Get all orders for a specific user
 * @param {string} userId - The user ID to fetch orders for
 * @returns {Array} Array of order objects for the user
 */
export const getOrdersByUserId = (userId) => {
  if (!userId) {
    console.warn('No userId provided to getOrdersByUserId');
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
    console.warn('Missing userId or orderId in getOrderById');
    return null;
  }
  
  const userOrders = ordersData[userId] || [];
  return userOrders.find(order => order.id === orderId) || null;
};

/**
 * Get orders by status for a specific user
 * @param {string} userId - The user ID
 * @param {number} status - The status to filter by (1-5)
 * @returns {Array} Array of orders with the specified status
 */
export const getOrdersByStatus = (userId, status) => {
  if (!userId) {
    console.warn('No userId provided to getOrdersByStatus');
    return [];
  }
  
  const userOrders = ordersData[userId] || [];
  return userOrders.filter(order => order.status === status);
};

/**
 * Get recent orders for a specific user
 * @param {string} userId - The user ID
 * @param {number} limit - Maximum number of orders to return (default: 5)
 * @returns {Array} Array of recent orders
 */
export const getRecentOrders = (userId, limit = 5) => {
  if (!userId) {
    console.warn('No userId provided to getRecentOrders');
    return [];
  }
  
  const userOrders = ordersData[userId] || [];
  // Sort by order date (most recent first) and limit results
  return userOrders
    .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
    .slice(0, limit);
};

/**
 * Add a new order for a user (for future use)
 * @param {string} userId - The user ID
 * @param {Object} orderData - The order data to add
 * @returns {boolean} Success status
 */
export const addOrder = (userId, orderData) => {
  if (!userId || !orderData) {
    console.warn('Missing userId or orderData in addOrder');
    return false;
  }
  
  if (!ordersData[userId]) {
    ordersData[userId] = [];
  }
  
  // Generate unique order ID
  const orderCount = Object.values(ordersData).flat().length + 1;
  const newOrder = {
    ...orderData,
    id: `SW2025-${orderCount.toString().padStart(3, '0')}`,
    userId: userId,
    orderDate: new Date().toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  };
  
  ordersData[userId].push(newOrder);
  return true;
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
    console.warn('Missing required parameters in updateOrderStatus');
    return false;
  }
  
  const userOrders = ordersData[userId] || [];
  const orderIndex = userOrders.findIndex(order => order.id === orderId);
  
  if (orderIndex === -1) {
    console.warn(`Order ${orderId} not found for user ${userId}`);
    return false;
  }
  
  ordersData[userId][orderIndex].status = newStatus;
  return true;
};

// Export the raw data for development/testing purposes
export const getAllOrdersData = () => ordersData;

// Export order status constants
export const ORDER_STATUS = {
  CONFIRMED: 1,
  BAKING: 2,
  QUALITY_CHECK: 3,
  OUT_FOR_DELIVERY: 4,
  DELIVERED: 5
};

// Export default
export default {
  getOrdersByUserId,
  getOrderById,
  getOrdersByStatus,
  getRecentOrders,
  addOrder,
  updateOrderStatus,
  getAllOrdersData,
  ORDER_STATUS
};