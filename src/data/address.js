// data/address.js

// Mock address data organized by user ID
const addressData = {
  // User 1 address
  iT3WaxAgG0cHuxI9JmThKcfvNG63: {
    userId: "iT3WaxAgG0cHuxI9JmThKcfvNG63",
    street: "123 MG Road, Near Forum Mall",
    city: "Bangalore",
    state: "Karnataka",
    postalCode: "560001",
    phone: "+91 9876543210",
    latitude: 12.9716,
    longitude: 77.5946,
    lastUpdated: "July 20, 2025, 3:30 PM",
    isDefault: true,
  },

  // User 2 address
  ihgIN3T74Hhms6Qx4QUtHy5OhNA3: {
    userId: "ihgIN3T74Hhms6Qx4QUtHy5OhNA3",
    street: "456 Brigade Road",
    city: "Bangalore",
    state: "Karnataka",
    postalCode: "560025",
    phone: "+91 9123456789",
    latitude: 12.9698,
    longitude: 77.6205,
    lastUpdated: "July 18, 2025, 2:15 PM",
    isDefault: true,
  },

  // User 3 address
  q0Ix9gaXa5VjVp8AGC65lDDYBOd2: {
    userId: "q0Ix9gaXa5VjVp8AGC65lDDYBOd2",
    street: "789 HSR Layout Main Road",
    city: "Bangalore",
    state: "Karnataka",
    postalCode: "560102",
    phone: "+91 9234567890",
    latitude: 12.9082,
    longitude: 77.6476,
    lastUpdated: "July 22, 2025, 10:45 AM",
    isDefault: true,
  },

  // User 4 address
  user101: {
    userId: "user101",
    street: "321 Whitefield Road, ITPL",
    city: "Bangalore",
    state: "Karnataka",
    postalCode: "560066",
    phone: "+91 9345678901",
    latitude: 12.9698,
    longitude: 77.75,
    lastUpdated: "July 19, 2025, 4:20 PM",
    isDefault: true,
  },
};

// Service functions to interact with address data

/**
 * Get address for a specific user
 * @param {string} userId - The user ID to fetch address for
 * @returns {Object|null} Address object for the user or null if not found
 */
export const getAddressByUserId = (userId) => {
  if (!userId) {
    console.warn("No userId provided to getAddressByUserId");
    return null;
  }

  return addressData[userId] || null;
};

/**
 * Save or update address for a user
 * @param {string} userId - The user ID
 * @param {Object} addressInfo - The address data to save
 * @returns {boolean} Success status
 */
export const saveAddress = (userId, addressInfo) => {
  if (!userId || !addressInfo) {
    console.warn("Missing userId or addressInfo in saveAddress");
    return false;
  }

  const newAddress = {
    userId: userId,
    ...addressInfo,
    lastUpdated: new Date().toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
    isDefault: true,
  };

  addressData[userId] = newAddress;
  console.log("Address saved successfully for user:", userId);
  return true;
};

/**
 * Delete address for a user
 * @param {string} userId - The user ID
 * @returns {boolean} Success status
 */
export const deleteAddress = (userId) => {
  if (!userId) {
    console.warn("No userId provided to deleteAddress");
    return false;
  }

  if (addressData[userId]) {
    delete addressData[userId];
    console.log("Address deleted successfully for user:", userId);
    return true;
  }

  console.warn(`No address found for user ${userId}`);
  return false;
};

/**
 * Check if user has a saved address
 * @param {string} userId - The user ID
 * @returns {boolean} True if user has saved address
 */
export const hasAddress = (userId) => {
  if (!userId) {
    return false;
  }

  return !!addressData[userId];
};

/**
 * Get formatted address string
 * @param {string} userId - The user ID
 * @returns {string} Formatted address string or empty string
 */
export const getFormattedAddress = (userId) => {
  const address = getAddressByUserId(userId);
  if (!address) return "";

  return `${address.street}, ${address.city}, ${address.state} ${address.postalCode}`;
};

/**
 * Get formatted address with phone
 * @param {string} userId - The user ID
 * @returns {string} Formatted address string with phone or empty string
 */
export const getFormattedAddressWithPhone = (userId) => {
  const address = getAddressByUserId(userId);
  if (!address) return "";

  return `${address.street}, ${address.city}, ${address.state} ${address.postalCode} (${address.phone})`;
};

/**
 * Update only coordinates for a user's address
 * @param {string} userId - The user ID
 * @param {number} latitude - New latitude
 * @param {number} longitude - New longitude
 * @returns {boolean} Success status
 */
export const updateCoordinates = (userId, latitude, longitude) => {
  if (!userId || latitude === undefined || longitude === undefined) {
    console.warn("Missing required parameters in updateCoordinates");
    return false;
  }

  if (addressData[userId]) {
    addressData[userId].latitude = latitude;
    addressData[userId].longitude = longitude;
    addressData[userId].lastUpdated = new Date().toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return true;
  }

  return false;
};

// Export the raw data for development/testing purposes
export const getAllAddressData = () => addressData;

// Export default
export default {
  getAddressByUserId,
  saveAddress,
  deleteAddress,
  hasAddress,
  getFormattedAddress,
  getFormattedAddressWithPhone,
  updateCoordinates,
  getAllAddressData,
};
