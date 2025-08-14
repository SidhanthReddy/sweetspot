import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Calendar, MapPin, CreditCard, ChevronDown, ChevronUp, Clock, CheckCircle, Truck, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { getOrdersByUserId } from '../data/orderData';
import OrderProgressTracker from './OrderProgressTracker';

const OrderList = () => {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

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

  const getStatusText = (status) => {
    switch (status) {
      case 1: return "Order Confirmed";
      case 2: return "Baking in Progress";
      case 3: return "Quality Check";
      case 4: return "Out for Delivery";
      case 5: return "Delivered";
      default: return "Unknown";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 1: return "text-blue-600 bg-blue-100 border-blue-200";
      case 2: return "text-yellow-600 bg-yellow-100 border-yellow-200";
      case 3: return "text-orange-600 bg-orange-100 border-orange-200";
      case 4: return "text-purple-600 bg-purple-100 border-purple-200";
      case 5: return "text-green-600 bg-green-100 border-green-200";
      default: return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 1: return Package;
      case 2: return Clock;
      case 3: return Clock;
      case 4: return Truck;
      case 5: return CheckCircle;
      default: return Package;
    }
  };

  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getProgressPercentage = (status) => {
    return (status / 5) * 100;
  };

  // Loading state
  if (authLoading || isLoading) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgba(224,99,99,0.85)] mx-auto mb-4"></div>
            <p className="text-[rgba(79,79,79,0.6)] font-parastoo">Loading your orders...</p>
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
                onClick={() => navigate('/login')}
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
              Track your sweet deliveries and stay updated with real-time progress
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
                          
                          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border font-semibold font-parastoo ${getStatusColor(order.status)}`}>
                            <StatusIcon className="w-4 h-4" />
                            {getStatusText(order.status)}
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-[rgba(224,99,99,0.85)] h-2 rounded-full transition-all duration-500"
                            style={{ width: `${getProgressPercentage(order.status)}%` }}
                          />
                        </div>

                        {/* Order Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          
                          {/* Cake Details */}
                          <div className="flex items-center gap-3">
                            <Package className="w-5 h-5 text-[rgba(224,99,99,0.85)]" />
                            <div>
                              <p className="text-sm text-[rgba(79,79,79,0.6)] font-parastoo">Cake</p>
                              <p className="font-semibold text-[rgba(79,79,79,0.7)] font-parastoo">{order.cakeName}</p>
                            </div>
                          </div>

                          {/* Delivery Date */}
                          <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-[rgba(224,99,99,0.85)]" />
                            <div>
                              <p className="text-sm text-[rgba(79,79,79,0.6)] font-parastoo">Delivery</p>
                              <p className="font-semibold text-[rgba(79,79,79,0.7)] font-parastoo">{order.deliveryDate}</p>
                            </div>
                          </div>

                          {/* Amount */}
                          <div className="flex items-center gap-3">
                            <CreditCard className="w-5 h-5 text-[rgba(224,99,99,0.85)]" />
                            <div>
                              <p className="text-sm text-[rgba(79,79,79,0.6)] font-parastoo">Total</p>
                              <p className="font-bold text-[rgba(224,99,99,0.85)] font-parastoo text-lg">{order.amount}</p>
                            </div>
                          </div>
                        </div>

                        {/* Address */}
                        <div className="flex items-center gap-3 pt-2">
                          <MapPin className="w-5 h-5 text-[rgba(224,99,99,0.85)]" />
                          <div>
                            <p className="text-sm text-[rgba(79,79,79,0.6)] font-parastoo">Delivery Address</p>
                            <p className="text-[rgba(79,79,79,0.7)] font-parastoo">{order.address}</p>
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

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 bg-gray-50 p-8">
                      
                      {/* Order Progress Tracker */}
                      <div className="mb-8">
                        <OrderProgressTracker currentStatus={order.status} />
                      </div>

                      {/* Additional Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Order Details */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-200">
                          <h5 className="font-bold text-[rgba(79,79,79,0.7)] font-parastoo mb-4">Order Details</h5>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-[rgba(79,79,79,0.6)] font-parastoo">Order Placed:</span>
                              <span className="font-semibold text-[rgba(79,79,79,0.7)] font-parastoo">{order.orderDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[rgba(79,79,79,0.6)] font-parastoo">Expected Delivery:</span>
                              <span className="font-semibold text-[rgba(79,79,79,0.7)] font-parastoo">{order.expectedDelivery}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[rgba(79,79,79,0.6)] font-parastoo">Payment Method:</span>
                              <span className="font-semibold text-[rgba(79,79,79,0.7)] font-parastoo">{order.paymentMethod}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[rgba(79,79,79,0.6)] font-parastoo">Contact:</span>
                              <span className="font-semibold text-[rgba(79,79,79,0.7)] font-parastoo">{order.phone}</span>
                            </div>
                            {order.specialInstructions && (
                              <div className="pt-2 border-t border-gray-100">
                                <span className="text-[rgba(79,79,79,0.6)] font-parastoo">Special Instructions:</span>
                                <p className="font-semibold text-[rgba(79,79,79,0.7)] font-parastoo mt-1">{order.specialInstructions}</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Contact Support */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-200">
                          <h5 className="font-bold text-[rgba(79,79,79,0.7)] font-parastoo mb-4">Need Help?</h5>
                          <div className="space-y-3">
                            <button 
                              onClick={() => { navigate('/contact-us'); window.scrollTo(0, 0); }} 
                              className="w-full px-4 py-2 border-2 border-[rgba(224,99,99,0.85)] text-[rgba(224,99,99,0.85)] rounded-lg font-semibold font-parastoo hover:bg-[rgba(224,99,99,0.85)] hover:text-white transition-all duration-200"
                            >
                              Contact Support
                            </button>
                            <p className="text-sm text-[rgba(79,79,79,0.6)] font-parastoo text-center">
                              Having issues with your order? We're here to help!
                            </p>
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
              <h3 className="text-xl font-bold text-[rgba(79,79,79,0.7)] font-parastoo mb-2">No Orders Found</h3>
              <p className="text-[rgba(79,79,79,0.6)] font-parastoo mb-6">You haven't placed any orders yet. Start exploring our delicious cakes!</p>
              <button 
                onClick={() => navigate('/')}
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
                  <p className="text-sm text-[rgba(79,79,79,0.6)] font-parastoo">Total Orders</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-8 h-8 text-yellow-600" />
                  </div>
                  <p className="text-2xl font-bold text-[rgba(79,79,79,0.7)] font-parastoo">
                    {orders.filter(order => order.status < 5).length}
                  </p>
                  <p className="text-sm text-[rgba(79,79,79,0.6)] font-parastoo">Pending</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-[rgba(79,79,79,0.7)] font-parastoo">
                    {orders.filter(order => order.status === 5).length}
                  </p>
                  <p className="text-sm text-[rgba(79,79,79,0.6)] font-parastoo">Delivered</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CreditCard className="w-8 h-8 text-rose-600" />
                  </div>
                  <p className="text-2xl font-bold text-[rgba(224,99,99,0.85)] font-parastoo">
                    ₹{orders.reduce((sum, order) => sum + parseInt(order.amount.replace('₹', '').replace(',', '')), 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-[rgba(79,79,79,0.6)] font-parastoo">Total Spent</p>
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
