import React from 'react';
import { Package, User, MapPin, Clock, Star, Cake } from 'lucide-react';

const OrderDetails = ({ orderData }) => {
  if (!orderData) {
    return (
      <div className="bg-white rounded-3xl border border-red-200 shadow-[0_4px_20px_rgba(239,68,68,0.1)] p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-red-600 font-parastoo mb-2">Order Not Found</h3>
          <p className="text-red-500 font-parastoo">
            No order data found. Please enter a valid Order ID.
          </p>
        </div>
      </div>
    );
  }
 
  const { orderId, user, orderItems, cakes, orderMeta } = orderData;

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'preparing':
      case 'baking':
        return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'out for delivery':
      case 'shipped':
        return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'delivered':
        return 'text-green-600 bg-green-100 border-green-200';
      default:
        return 'text-[rgba(224,99,99,0.85)] bg-rose-100 border-rose-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Order Summary Header */}
      <div className="bg-white rounded-3xl border border-rose-200 shadow-[0_4px_20px_rgba(244,63,94,0.1)] p-8">
        <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[rgba(224,99,99,0.1)] rounded-full flex items-center justify-center">
              <Package className="w-6 h-6 text-[rgba(224,99,99,0.85)]" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-[rgba(79,79,79,0.7)] font-parastoo">
                Order #{orderId}
              </h2>
              <p className="text-[rgba(79,79,79,0.6)] font-parastoo">Order Details & Status</p>
            </div>
          </div>
          
          <div className={`px-4 py-2 rounded-xl border font-semibold font-parastoo ${getStatusColor(orderMeta.orderStatus)}`}>
            {orderMeta.orderStatus}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-[rgba(224,99,99,0.85)]" />
            <div>
              <p className="text-sm text-[rgba(79,79,79,0.6)] font-parastoo">Delivery Location</p>
              <p className="font-semibold text-[rgba(79,79,79,0.7)] font-parastoo">{orderMeta.orderLocation}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-[rgba(224,99,99,0.85)]" />
            <div>
              <p className="text-sm text-[rgba(79,79,79,0.6)] font-parastoo">Expected Delivery</p>
              <p className="font-semibold text-[rgba(79,79,79,0.7)] font-parastoo">{orderMeta.orderDeadLine}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Cake className="w-5 h-5 text-[rgba(224,99,99,0.85)]" />
            <div>
              <p className="text-sm text-[rgba(79,79,79,0.6)] font-parastoo">Total Items</p>
              <p className="font-semibold text-[rgba(79,79,79,0.7)] font-parastoo">{orderItems.length} Cake{orderItems.length > 1 ? 's' : ''}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Information */}
      <div className="bg-white rounded-3xl border border-rose-200 shadow-[0_4px_20px_rgba(244,63,94,0.1)] p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-[rgba(224,99,99,0.1)] rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-[rgba(224,99,99,0.85)]" />
          </div>
          <h3 className="text-xl font-bold text-[rgba(79,79,79,0.7)] font-parastoo">Customer Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-[rgba(79,79,79,0.6)] font-parastoo">Full Name</label>
            <p className="text-[rgba(79,79,79,0.7)] font-parastoo font-medium">{user.userName}</p>
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2 text-[rgba(79,79,79,0.6)] font-parastoo">Email Address</label>
            <p className="text-[rgba(79,79,79,0.7)] font-parastoo font-medium">{user.userEmail}</p>
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2 text-[rgba(79,79,79,0.6)] font-parastoo">Customer ID</label>
            <p className="text-[rgba(79,79,79,0.7)] font-parastoo font-medium">{user.userId}</p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-3xl border border-rose-200 shadow-[0_4px_20px_rgba(244,63,94,0.1)] p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-[rgba(224,99,99,0.1)] rounded-full flex items-center justify-center">
            <Cake className="w-6 h-6 text-[rgba(224,99,99,0.85)]" />
          </div>
          <h3 className="text-xl font-bold text-[rgba(79,79,79,0.7)] font-parastoo">Order Items</h3>
        </div>
        
        <div className="space-y-6">
          {orderItems.map((item, index) => {
            const cake = cakes.find(c => c.cakeId === item.cakeID);

            return (
              <div key={index} className="bg-gray-50 rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-all duration-300">
                <div className="flex flex-col lg:flex-row gap-6">
                  
                  {/* Cake Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={cake.cakeImage}
                      alt={cake.cakeName}
                      className="w-full lg:w-48 h-48 object-cover rounded-xl border border-gray-200 shadow-sm"
                    />
                  </div>
                  
                  {/* Cake Details */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <h4 className="text-xl font-bold text-[rgba(79,79,79,0.7)] font-parastoo mb-1">
                        {cake.cakeName}
                      </h4>
                      <p className="text-[rgba(224,99,99,0.85)] font-medium font-parastoo italic">
                        {cake.cakeFlavour} Flavor
                      </p>
                    </div>
                    
                    {/* Order Specifications */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[rgba(79,79,79,0.6)] font-parastoo mb-1">Weight</label>
                        <p className="text-[rgba(79,79,79,0.7)] font-parastoo font-medium">{item.weight} kg</p>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-semibold text-[rgba(79,79,79,0.6)] font-parastoo mb-1">Type</label>
                        <p className="text-[rgba(79,79,79,0.7)] font-parastoo font-medium">{item.eggOption}</p>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-semibold text-[rgba(79,79,79,0.6)] font-parastoo mb-1">Quantity</label>
                        <p className="text-[rgba(79,79,79,0.7)] font-parastoo font-medium">{item.quantity}</p>
                      </div>
                    </div>
                    
                    {/* Message */}
                    {item.messageOnCake && (
                      <div>
                        <label className="block text-xs font-semibold text-[rgba(79,79,79,0.6)] font-parastoo mb-1">Custom Message</label>
                        <p className="text-[rgba(79,79,79,0.7)] font-parastoo italic bg-white p-3 rounded-lg border border-gray-200">
                          "{item.messageOnCake}"
                        </p>
                      </div>
                    )}
                    
                    {/* Cake Information */}
                    <div className="space-y-3 pt-4 border-t border-gray-200">
                      <div>
                        <label ClassName="block text-xs font-semibold text-[rgba(79,79,79,0.6)] font-parastoo mb-1">Ingredients</label>
                        <div className="flex flex-wrap gap-2">
                          {cake.cakeIngredients.map((ingredient, idx) => (
                            <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium font-parastoo">
                              {ingredient}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-semibold text-[rgba(79,79,79,0.6)] font-parastoo mb-1">Tags</label>
                        <div className="flex flex-wrap gap-2">
                          {cake.cakeTags.map((tag, idx) => (
                            <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium font-parastoo">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-semibold text-[rgba(79,79,79,0.6)] font-parastoo mb-1">Available Options</label>
                        <div className="flex flex-wrap gap-2">
                          {cake.cakeEggOptions.map((option, idx) => (
                            <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium font-parastoo">
                              {option}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;