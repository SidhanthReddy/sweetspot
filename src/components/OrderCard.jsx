import React from 'react';
import OrderProgressTracker from './OrderProgressTracker.jsx';
import OrderDetails from './OrderDetails.jsx';
import SweetMessages from './SweetMessages.jsx';

const ORDER_STATUSES = {
  1: { text: "Order Confirmed", color: "bg-sweetspot-alt1/10 text-sweetspot-alt1 border-sweetspot-alt1/20" },
  2: { text: "Baking in Progress", color: "bg-sweetspot-main/10 text-sweetspot-main border-sweetspot-main/20" },
  3: { text: "Quality Check", color: "bg-sweetspot-alt2/10 text-sweetspot-alt2 border-sweetspot-alt2/20" },
  4: { text: "Out for Delivery", color: "bg-sweetspot-alt3/10 text-sweetspot-alt3 border-sweetspot-alt3/20" },
  5: { text: "Delivered", color: "bg-sweetspot-alt4/10 text-sweetspot-alt4 border-sweetspot-alt4/20" },
};

const OrderCard = ({ order, expanded, onToggle }) => {
  const cake = order.cakes[0];
  const delivery = order.orderItems[0];
  const user = order.user;

  return (
    <div className="border border-sweetspot-main/10 bg-white hover:border-sweetspot-main/40 rounded-2xl transition duration-200 font-parastoo">
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Order ID and customer */}
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-sweetspot-main" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7m16 0l-8 4m0 0L4 7m8 4v10" />
              </svg>
              <div>
                <p className="font-semibold text-sweetspot-main">{order.orderId}</p>
                <p className="text-sm text-sweetspot-text">{user.userName}</p>
              </div>
            </div>

            {/* Cake and amount */}
            <div>
              <p className="font-medium text-[rgba(79,79,79,0.8)]">{cake.cakeName}</p>
              <p className="text-sm text-sweetspot-text">₹{(cake.cakePrice || '—')}</p>
            </div>

            {/* Date and location */}
            <div className="flex items-start gap-2">
              <svg className="w-4 h-4 mt-1 text-sweetspot-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 6.343a8 8 0 010 11.314m-2.829-8.485a4 4 0 010 5.657M12 4v16m-8-8h16" />
              </svg>
              <div>
                <p className="text-sm font-medium">{new Date(delivery.orderDeadLine).toDateString()}</p>
                <p className="text-xs text-sweetspot-text">{delivery.orderLocation}</p>
              </div>
            </div>
          </div>

          {/* Status & toggle */}
          
{/* Status & toggle */}
          <div className="flex items-center">
            <button
              className="bg-sweetspot-main text-white px-4 py-2 text-sm rounded-full hover:opacity-90 transition flex items-center gap-2"
              onClick={onToggle}
              title={ORDER_STATUSES[delivery.progressStep]?.text || "Unknown"}
            >
              <span
                className="px-3 py-1 rounded-full text-xs font-medium bg-white text-gray-700 border border-gray-200"
              >
                {ORDER_STATUSES[delivery.progressStep]?.text || "Unknown Status"}
              </span>
              {expanded ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                  </svg>
                  Hide Details
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                  View Details
                </>
              )}
            </button>
          </div>
        </div>

        {expanded && (
          <div className="mt-6 pt-6 border-t border-sweetspot-main/20 animate-fade-in space-y-6">
            <OrderProgressTracker currentStage={delivery.progressStep} />
            <OrderDetails orderData={order} />
            <SweetMessages orderId={order.orderId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
