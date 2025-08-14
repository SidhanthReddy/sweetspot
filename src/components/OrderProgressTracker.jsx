import React from 'react';

const OrderProgressTracker = ({ currentStatus }) => {
  const stepNames = ["Confirmed", "Baking", "Quality Check", "Out for Delivery", "Delivered"];

  return (
    <div className="mb-8">
      <h4 className="text-lg font-bold text-[rgba(79,79,79,0.7)] font-parastoo mb-6">Order Progress</h4>

      <div className="flex justify-between items-center relative">
        {[1, 2, 3, 4, 5].map((step, index) => {
          const isCompleted = step <= currentStatus;
          const isCurrent = step === currentStatus;

          return (
            <div key={step} className="flex flex-col items-center flex-1 relative">
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300
                ${isCompleted 
                  ? 'bg-[rgba(224,99,99,0.85)] text-white' 
                  : 'bg-gray-200 text-gray-400'
                }
                ${isCurrent ? 'animate-pulse' : ''}
              `}>
                <span className="text-sm font-bold">{step}</span>
              </div>

              <span className={`
                text-xs font-semibold font-parastoo text-center
                ${isCompleted 
                  ? 'text-[rgba(224,99,99,0.85)]' 
                  : 'text-gray-400'
                }
              `}>
                {stepNames[index]}
              </span>

              {index < 4 && (
                <div
                  className={`
                    hidden sm:block absolute h-1 mt-6 transition-all duration-300
                    ${isCompleted && step < currentStatus ? 'bg-[rgba(224,99,99,0.85)]' : 'bg-gray-200'}
                  `}
                  style={{
                    width: `calc(100% / 5 - 3rem)`,
                    left: `calc(${((index + 0.6) * 100) / 5}%)`
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderProgressTracker;
