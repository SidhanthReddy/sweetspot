import React, { useState } from 'react';

function IngredientsToolTip({ cake, cardId }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  
  return (
    <div className="space-y-1">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-600">Ingredients:</span>
        <div
          className="relative inline-block"
          onMouseEnter={() => setHoveredCard(cardId)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Ingredients Icon SVG */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-600 hover:text-gray-800 cursor-pointer transition-colors"
          >
            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
            <path d="M7 2v20"/>
            <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm-5 1v7a2 2 0 0 1-2 2"/>
            <circle cx="12" cy="5" r="2"/>
          </svg>
          
          {/* Tooltip */}
          {hoveredCard === cardId && (
            <div className="absolute z-10 w-80 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg -top-2 left-0 transform -translate-y-full">
              <div className="leading-relaxed">
                {cake.ingredients}
              </div>
              {/* Tooltip arrow */}
              <div className="absolute top-full left-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default IngredientsToolTip;

