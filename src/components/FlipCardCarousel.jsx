import React from 'react'
import { flipCardData } from '../data/flip_card.js';

function FlipCardCarousel() {
  const duplicatedCards = [...flipCardData, ...flipCardData];

  return (
    <div className="overflow-hidden w-full pb-4 pt-8 carousel-container">
      <div className="flex">
        {/* First Carousel */}
        <div className='flex space-x-16 animate-loop-scroll-flip'>
          {duplicatedCards.map((card, index) => (
            <div key={`carousel1-${card.id}-${index}`} className="w-[320px] h-[400px] flex-shrink-0 group perspective-1000">
              {/* Flip Card Container */}
              <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                
                {/* Front Side - Text Content */}
                <div className="absolute inset-0 w-full h-full bg-white rounded-lg shadow-md backface-hidden border border-gray-200">
                  <div className="p-6 h-full flex flex-col justify-center items-start relative">
                    {/* Large decorative opening quote */}
                    <div className="text-6xl text-gray-300 font-serif leading-none mb-1">"</div>
                    
                    <div className="pl-4 relative -mt-2">
                      <p className="font-parastoo text-2xl text-gray-800 text-left leading-relaxed italic mb-4">
                        {card.text}
                      </p>
                      
                      {/* Closing quote mark */}
                      <div className="text-4xl text-gray-300 font-serif leading-none text-right">"</div>
                    </div>
                    
                    {/* Optional: Add a subtle left border to emphasize the quote */}
                    <div className="absolute left-6 top-1/2 transform -translate-y-1/2 w-1 h-20 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
                
                {/* Back Side - Image */}
                <div className="absolute inset-0 w-full h-full bg-white rounded-lg shadow-md backface-hidden rotate-y-180 overflow-hidden">
                  <img
                    src={card.image}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Second Carousel - Continues seamlessly */}
        <div className='flex space-x-16 animate-loop-scroll-flip ml-16'>
          {duplicatedCards.map((card, index) => (
            <div key={`carousel2-${card.id}-${index}`} className="w-[320px] h-[400px] flex-shrink-0 group perspective-1000">
              {/* Flip Card Container */}
              <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                
                {/* Front Side - Text Content */}
                <div className="absolute inset-0 w-full h-full bg-white rounded-lg shadow-md backface-hidden border border-gray-200">
                  <div className="p-6 h-full flex flex-col justify-center items-start relative">
                    {/* Large decorative opening quote */}
                    <div className="text-6xl text-gray-300 font-serif leading-none mb-1">"</div>
                    
                    <div className="pl-4 relative -mt-2">
                      <p className="font-parastoo text-2xl text-gray-800 text-left leading-relaxed italic mb-4">
                        {card.text}
                      </p>
                      
                      {/* Closing quote mark */}
                      <div className="text-4xl text-gray-300 font-serif leading-none text-right">"</div>
                    </div>
                    
                    {/* Optional: Add a subtle left border to emphasize the quote */}
                    <div className="absolute left-6 top-1/2 transform -translate-y-1/2 w-1 h-20 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
                
                {/* Back Side - Image */}
                <div className="absolute inset-0 w-full h-full bg-white rounded-lg shadow-md backface-hidden rotate-y-180 overflow-hidden">
                  <img
                    src={card.image}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FlipCardCarousel;