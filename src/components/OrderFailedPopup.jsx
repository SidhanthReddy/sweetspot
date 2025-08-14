import React from 'react';
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';
import failedAnimation from '../assets/Failed.json'; // Replace with your actual .json

const OrderFailedPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-[Parastoo] p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-3xl relative text-center animate-fadeIn border-t-[10px] border-red-400 transition-all">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-red-500 text-4xl font-bold hover:scale-110 transition"
        >
          &times;
        </button>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-red-500">Order Not Confirmed</h2>

        {/* Animation */}
        <div className="mb-6 w-60 md:w-80 mx-auto">
          <Lottie animationData={failedAnimation} loop={true} />
        </div>

        {/* Message */}
        <p className="text-base md:text-lg text-[rgba(79,79,79,0.8)] mb-4">
          Oops! Something went wrong while placing your order. 😔<br />
          Please check your connection or payment method and try again.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition"
          >
            Try Again
          </button>
          <Link
            to="/contact-support"
            className="text-red-500 underline hover:text-red-600 font-medium"
            onClick={onClose}
          >
            Contact Support
          </Link>
        </div>

        {/* Tagline */}
        <p className="italic text-[rgba(79,79,79,0.7)] text-lg mt-6">
          "We’re baking your joy, let’s try again!"
        </p>
      </div>
    </div>
  );
};

export default OrderFailedPopup;
