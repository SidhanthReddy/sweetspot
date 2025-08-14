import React, { useState } from 'react';
import Lottie from 'lottie-react';
import successAnimation from '../assets/sucess1.json';
import failedAnimation from '../assets/Failed.json';

const CustomCakeConfirmation = ({ 
  isOpen, 
  onClose, 
  onConfirm, // New prop to handle confirmation
  calculatedPrice, 
  budgetRange,
  formData,
  onOpenCart // New prop to handle opening cart modal
}) => {
  const [confirmationStep, setConfirmationStep] = useState(1);
  const [userConfirmed, setUserConfirmed] = useState(false);

  if (!isOpen) return null;

  const priceExceedsBudget = calculatedPrice > parseInt(budgetRange);
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(calculatedPrice);

  const handleConfirm = () => {
    // Call the onConfirm function to add to cart
    if (onConfirm) {
      onConfirm();
    }
    
    setUserConfirmed(true);
    setConfirmationStep(2);
  };

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      setConfirmationStep(1);
      setUserConfirmed(false);
      onClose();
    }
  };

  const handleModalClose = () => {
    setConfirmationStep(1);
    setUserConfirmed(false);
    onClose();
  };

  const handleOpenCart = () => {
    // Close this modal first
    handleModalClose();
    // Then open the cart modal
    if (onOpenCart) {
      onOpenCart();
    }
  };

  // Step 1: Initial confirmation (no animation)
  if (confirmationStep === 1) {
    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={handleClose}
      >
        <div 
          className="bg-white rounded-lg p-6 max-w-md w-full relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={handleModalClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            ×
          </button>

          <h2 className="text-2xl font-bold text-center mb-4">
            {priceExceedsBudget ? 'Budget Exceeded' : 'Review Your Order'}
          </h2>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Your Cake Details:</h3>
            <ul className="space-y-1 text-sm">
              <li>Flavor: {formData.flavor}</li>
              <li>Weight: {formData.weight}</li>
              <li>Estimated Price: {formattedPrice}</li>
              <li>Your Budget: ₹{budgetRange}</li>
            </ul>
          </div>

          <p className="mb-6 text-center">
            {priceExceedsBudget ? (
              "The estimated price exceeds your budget range. Do you still wish to continue?"
            ) : (
              "Please review your cake details before confirming."
            )}
          </p>

          <div className="flex justify-center space-x-4">
            <button
              onClick={handleModalClose}
              className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              {priceExceedsBudget ? 'Cancel' : 'Edit'}
            </button>
            <button
              onClick={handleConfirm}
              className="px-6 py-2 bg-[rgba(224,99,99,0.85)] text-white rounded-md hover:bg-amber-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Success confirmation (with animation)
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleClose}
    >
      <div 
        className="bg-white rounded-lg p-6 max-w-md w-full text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={handleModalClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl leading-none"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-4">
          Added to Cart!
        </h2>

        <div className="flex justify-center mb-6">
          <div className="w-48 h-48">
            <Lottie 
              animationData={successAnimation} 
              loop={true}
            />
          </div>
        </div>

        <p className="mb-4 text-lg">
          Your custom cake has been added to your cart.
        </p>
        <p className="mb-4">
          Order whenever you wish to.
        </p>

        <p className="text-sm text-gray-500">
          Thank you for choosing us! 💖
        </p>
      </div>
    </div>
  );
};

export default CustomCakeConfirmation;