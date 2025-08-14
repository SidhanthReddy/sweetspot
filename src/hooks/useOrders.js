// hooks/useOrders.js
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { 
  getOrdersByUserId, 
  getOrderById, 
  getOrdersByStatus, 
  getRecentOrders,
  ORDER_STATUS 
} from '../data/orderData';

export const useOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders when user changes
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (user?.uid) {
          const userOrders = getOrdersByUserId(user.uid);
          setOrders(userOrders);
        } else {
          setOrders([]);
        }
      } catch (err) {
        setError('Failed to fetch orders');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  // Get orders by status
  const getOrdersByStatusForUser = (status) => {
    if (!user?.uid) return [];
    return getOrdersByStatus(user.uid, status);
  };

  // Get a specific order
  const getOrder = (orderId) => {
    if (!user?.uid || !orderId) return null;
    return getOrderById(orderId, user.uid);
  };

  // Get recent orders
  const getRecentUserOrders = (limit = 5) => {
    if (!user?.uid) return [];
    return getRecentOrders(user.uid, limit);
  };

  // Get order statistics
  const getOrderStats = () => {
    if (!orders.length) {
      return {
        total: 0,
        confirmed: 0,
        baking: 0,
        qualityCheck: 0,
        outForDelivery: 0,
        delivered: 0
      };
    }

    return {
      total: orders.length,
      confirmed: orders.filter(order => order.status === ORDER_STATUS.CONFIRMED).length,
      baking: orders.filter(order => order.status === ORDER_STATUS.BAKING).length,
      qualityCheck: orders.filter(order => order.status === ORDER_STATUS.QUALITY_CHECK).length,
      outForDelivery: orders.filter(order => order.status === ORDER_STATUS.OUT_FOR_DELIVERY).length,
      delivered: orders.filter(order => order.status === ORDER_STATUS.DELIVERED).length
    };
  };

  // Get pending orders (not delivered)
  const getPendingOrders = () => {
    return orders.filter(order => order.status !== ORDER_STATUS.DELIVERED);
  };

  // Get completed orders (delivered)
  const getCompletedOrders = () => {
    return orders.filter(order => order.status === ORDER_STATUS.DELIVERED);
  };

  return {
    orders,
    loading,
    error,
    getOrdersByStatusForUser,
    getOrder,
    getRecentUserOrders,
    getOrderStats,
    getPendingOrders,
    getCompletedOrders,
    refreshOrders: () => {
      if (user?.uid) {
        const userOrders = getOrdersByUserId(user.uid);
        setOrders(userOrders);
      }
    }
  };
};

export default useOrders;