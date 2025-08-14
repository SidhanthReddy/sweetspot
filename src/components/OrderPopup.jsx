import React from 'react';
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom'; 
import deliveryAnimation from '../assets/sucess1.json'; 

const OrderPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-[Parastoo] p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-3xl relative text-center animate-fadeIn border-t-[10px] border-[rgba(224,99,99,0.85)] transition-all">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-[rgba(224,99,99,0.85)] text-4xl font-bold hover:scale-110 transition"
        >
          &times;
        </button>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[rgba(79,79,79,0.8)]"> Order Confirmed!</h2>

        {/* Animation */}
        <div className="mb-6 w-60 md:w-80 mx-auto">
          <Lottie animationData={deliveryAnimation} loop={true} />
        </div>

        {/* Message with navigation */}
        <p className="text-base md:text-lg text-[rgba(79,79,79,0.8)] mb-3">
          Your delicious cake is on its way and will arrive in approx. <strong>2 hours</strong>! 🎂<br />
          You can track your order in the&nbsp;
          <Link
            to="/orders"
            className="text-[rgba(224,99,99,0.85)] underline font-semibold hover:text-rose-600 transition"
            onClick={onClose}
          >
            My Orders
          </Link>
          &nbsp;section under your profile.
        </p>

        {/* Thank You */}
        <p className="text-xl md:text-2xl font-semibold text-pink-500 mt-6">
          Thank you for choosing <span className="text-rose-600">SweetSpot</span>! 💖
        </p>

        {/* Tagline */}
        <p className="italic text-[rgba(79,79,79,0.7)] text-lg mt-2">
          "Delivering happiness, one slice at a time."
        </p>
      </div>
    </div>
  );
};

export default OrderPopup;
