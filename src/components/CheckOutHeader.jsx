import React from "react";
import { useNavigate } from "react-router-dom";

export default function CheckOutHeader() {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b-[2px] border-b-gray-200 mb-8 sm:mb-12 lg:mb-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:ml-10 lg:px-4 flex items-center gap-3 sm:gap-4 lg:gap-6 py-4 sm:py-5 lg:py-6">
        {/* Back Arrow Button */}
        <button
          onClick={() => navigate("/cakes")}
          className="flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-red-200 shadow-sm hover:bg-rose-100 transition-colors"
          aria-label="Go back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            className="sm:w-6 sm:h-6 lg:w-7 lg:h-7"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="#da8989"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Heading and Subheading */}
        <div className="text-left flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-[rgba(79,79,79,0.66)] tracking-tight font-parastoo flex items-center gap-1 sm:gap-2">
            <span className="truncate">Your Perfect Order Awaits</span>
            <span className="inline-block animate-truck flex-shrink-0">🚚</span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg italic text-[rgba(79,79,79,0.7)] font-sans mt-0.5 sm:mt-1">
            Where cravings meet convenience 🎂
          </p>
        </div>
      </div>

      {/* Truck Animation */}
      <style>{`
        @keyframes drive {
          0% { transform: translateX(0); }
          50% { transform: translateX(10px); }
          100% { transform: translateX(0); }
        }
        .animate-truck {
          animation: drive 2s ease-in-out infinite;
          display: inline-block;
        }
        
        /* Mobile optimizations */
        @media (max-width: 640px) {
          .animate-truck {
            animation: drive 2s ease-in-out infinite;
            transform: scale(0.9);
          }
        }
      `}</style>
    </div>
  );
}