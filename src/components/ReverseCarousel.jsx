import React from 'react'
import { cakeData } from '../data/cake_data_2.js';
import IngredientsToolTip from './IngredientsToolTip.jsx';

function ReverseCarousel() {

  const duplicatedCakes = [...cakeData, ...cakeData];

  return (
    <div className="overflow-hidden w-full font-inter pb-4 pt-8">
      <div className='flex space-x-16 animate-loop-scroll-reverse'>
        {duplicatedCakes.map((cake, index) => (
          <div key={`${cake.id}-${index}`} className="w-[320px] flex-shrink-0 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            {/* Image Section */}
            <div className="w-full h-[200px] overflow-hidden rounded-t-lg">
              <img 
                src={cake.image} 
                alt={cake.name} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
              />
            </div>
            
            {/* Content Section */}
            <div className="p-4 space-y-3">
              {/* Name and Price */}
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg text-gray-800 leading-tight">{cake.name}</h3>
                <span className="font-bold text-lg text-green-600 ml-2">{cake.price}</span>
              </div>
              
              {/* Flavour */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-600">Flavour:</span>
                <span className="text-sm text-gray-800 bg-gray-100 px-2 py-1 rounded-full">{cake.flavour}</span>
              </div>
              
              {/* Ingredients */}
            <IngredientsToolTip 
              cake={cake} 
              cardId={`${cake.id}-${index}`} 
            />
              
              {/* Buy Now Button */}
              <button
                className="w-full text-white font-medium py-2.5 px-4 rounded-lg transition-colors  duration-400 focus:outline-none focus:ring-2 focus:ring-[rgba(224,99,99,0.85)] focus:ring-offset-2 bg-[rgba(224,99,99,0.85)] hover:text-[rgba(224,99,99,0.85)] hover:bg-white" 
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReverseCarousel;