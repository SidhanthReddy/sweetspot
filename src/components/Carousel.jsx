import React, { useState } from 'react';
import { cakeData } from '../data/data.js';
import CakeCard from './CakeCard';
import CakeModal from './CakeModal';
import { useCart } from '../components/CartContext';

function Carousel() {
  const [selectedCake, setSelectedCake] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart, updateQuantity, cartItems } = useCart();
  
  // Create duplicated array for seamless looping
  const duplicatedCakes = [...cakeData, ...cakeData];

  const handleCardClick = (cake) => {
    setSelectedCake(cake);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCake(null);
  };

  const handleAddToCart = (cake) => {
    const existingItem = cartItems.find(item => item.id === cake.id);
    
    if (existingItem) {
      updateQuantity(cake.id, existingItem.quantity + 1);
    } else {
      addToCart({
        ...cake,
        quantity: 1,
        selectedWeight: cake.availableWeights?.[0] || 1,
        eggOption: cake.eggOptions?.[0] || 'Egg',
        messageOnCake: '',
        totalPrice: cake.price * (cake.availableWeights?.[0] || 1)
      });
    }
  };

  const handleUpdateQuantity = (cakeId, newQuantity) => {
    if (newQuantity <= 0) {
      updateQuantity(cakeId, 0);
    } else {
      updateQuantity(cakeId, newQuantity);
    }
  };

  return (
    <>
      <div className="overflow-hidden w-full font-inter pb-4 carousel-container">
        <div className="flex">
          {/* First Carousel Row */}
          <div className='flex space-x-6 animate-loop-scroll md:animate-loop-scroll-md lg:animate-loop-scroll-lg'>
            {duplicatedCakes.map((cake, index) => {
              const cartItem = cartItems.find(item => item.id === cake.id);
              return (
                <div key={`carousel1-${cake.id}-${index}`} className="w-[320px] flex-shrink-0">
                  <CakeCard 
                    cake={cake} 
                    onCardClick={handleCardClick}
                    onAddToCart={handleAddToCart}
                    cartItem={cartItem}
                    onUpdateQuantity={handleUpdateQuantity}
                    isWishlistPage={false}
                  />
                </div>
              );
            })}
          </div>

          {/* Second Carousel Row - Continues seamlessly */}
          <div className='flex space-x-6 animate-loop-scroll md:animate-loop-scroll-md lg:animate-loop-scroll-lg ml-6'>
            {duplicatedCakes.map((cake, index) => {
              const cartItem = cartItems.find(item => item.id === cake.id);
              return (
                <div key={`carousel2-${cake.id}-${index}`} className="w-[320px] flex-shrink-0">
                  <CakeCard 
                    cake={cake} 
                    onCardClick={handleCardClick}
                    onAddToCart={handleAddToCart}
                    cartItem={cartItem}
                    onUpdateQuantity={handleUpdateQuantity}
                    isWishlistPage={false}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cake Modal */}
      <CakeModal 
        cake={selectedCake}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}

export default Carousel;