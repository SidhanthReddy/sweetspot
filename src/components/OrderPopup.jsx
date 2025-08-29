import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import deliveryAnimation from '../assets/sucess1.json';

// Inject CSS styles for hiding navbar
const injectStyles = () => {
  const styleId = 'hide-navbar-styles';
  if (document.getElementById(styleId)) return;
  
  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    body.hide-navbar nav,
    body.hide-navbar header,
    body.hide-navbar .navbar {
      display: none !important;
    }
  `;
  document.head.appendChild(style);
};

const OrderPopup = ({ isOpen, onClose }) => {
  const popupContentRef = useRef(null);
  const navigate = useNavigate();

  // Inject styles and hide navbar when popup is open
  useEffect(() => {
    injectStyles(); // Add CSS styles to document head
    
    if (isOpen) {
      document.body.classList.add('hide-navbar');
    } else {
      document.body.classList.remove('hide-navbar');
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('hide-navbar');
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && popupContentRef.current) {
      const element = popupContentRef.current;
      
      // Disable scrolling immediately
      element.style.overflow = 'hidden';
      
      // Auto-scroll to bottom after 1.5 seconds with very smooth, elegant animation
      const scrollTimer = setTimeout(() => {
        const targetScroll = element.scrollHeight - element.clientHeight;
        const startScroll = element.scrollTop;
        const distance = targetScroll - startScroll;
        const duration = 2500; // 2.5 seconds for very smooth scroll
        
        let startTime = null;
        
        const smoothScroll = (currentTime) => {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / duration, 1);
          
          // Easing function for elegant movement (ease-in-out cubic)
          const easeInOutCubic = progress < 0.5 
            ? 4 * progress * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
          
          element.scrollTop = startScroll + (distance * easeInOutCubic);
          
          if (progress < 1) {
            requestAnimationFrame(smoothScroll);
          } else {
            // Re-enable scrolling when animation completes
            element.style.overflow = 'auto';
          }
        };
        
        requestAnimationFrame(smoothScroll);
      }, 1500);
      
      // Cleanup: clear timer and restore scrolling on unmount or popup close
      return () => {
        clearTimeout(scrollTimer);
        if (element) {
          element.style.overflow = 'auto';
        }
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-[Parastoo] p-4">
      <div 
        ref={popupContentRef}
        className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-4xl relative text-center animate-fadeIn border-t-[10px] border-[rgba(224,99,99,0.85)] transition-all max-h-[90vh] overflow-y-auto"
      >
        
        {/* Close Button */}
        <button
          onClick={() => {
            navigate('/');
            window.scrollTo(0, 0);
            onClose();
          }}
          className="absolute top-4 right-6 text-[rgba(224,99,99,0.85)] text-5xl font-bold hover:scale-110 transition z-10"
        >
          &times;
        </button>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[rgba(79,79,79,0.8)]">
          Order Confirmed!
        </h2>

        {/* Animation */}
        <div className="mb-6 w-80 md:w-120 mx-auto">
          <Lottie animationData={deliveryAnimation} loop={true} />
        </div>

        {/* Main Message */}
        <div className="mb-8">
          <p className="text-base md:text-lg text-[rgba(79,79,79,0.8)] mb-3">
            Your delicious cake is on its way and will arrive in approx. <strong>2 hours</strong>! 🎂<br />
            You can track your order in the&nbsp;
            <Link
              to="/orders"
              className="text-[rgba(224,99,99,0.85)] underline font-semibold hover:text-rose-600 transition"
              onClick={() => (onClose(), navigate('/'), window.scrollTo(0, 0))}
            >
              My Orders
            </Link>
            &nbsp;section under your profile.
          </p>

          {/* Thank You */}
          <p className="text-xl md:text-2xl font-semibold text-pink-500 mt-6 mb-2">
            Thank you for choosing <span className="text-rose-600">SweetSpot</span>! 💖
          </p>

          {/* Follow Us Message */}
          <p className="text-base md:text-lg text-[rgba(79,79,79,0.8)] mt-4 mb-4">
            Follow us for more sweet updates and exclusive offers!
          </p>
          <div className="flex justify-center space-x-4 mb-4">
            <a href="#" className="text-[rgba(224,99,99,0.85)] hover:text-rose-600 transition-colors">
              <Facebook size={28} />
            </a>
            <a href="#" className="text-[rgba(224,99,99,0.85)] hover:text-rose-600 transition-colors">
              <Instagram size={28} />
            </a>
            <a href="#" className="text-[rgba(224,99,99,0.85)] hover:text-rose-600 transition-colors">
              <Youtube size={28} />
            </a>
          </div>
        </div>

        {/* Professional Engagement Section */}
        <div className="border-t border-gray-100 pt-6 space-y-6">
          
          {/* Review Request */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
            <div className="flex items-center justify-center mb-3">
              <div className="flex space-x-1 text-yellow-400">
                <span className="text-2xl">⭐⭐⭐⭐⭐</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-[rgba(79,79,79,0.8)] mb-2">
              Loved your experience? Share it with others!
            </h3>
            <p className="text-sm text-[rgba(79,79,79,0.7)] mb-4">
              Your review helps us serve better and helps other cake lovers discover the sweetness!
            </p>
            <button className="bg-[rgba(224,99,99,0.85)] text-white px-6 py-2 rounded-full font-medium hover:bg-rose-600 transition-colors" onClick={() => (onClose(), navigate('/orders'), window.scrollTo(0, 0))}>
              Leave a Review ⭐
            </button>
          </div>
          
        </div>

        {/* Tagline */}
        <p className="italic text-[rgba(79,79,79,0.7)] text-lg mt-6 border-t border-gray-100 pt-4">
          "Delivering happiness, one slice at a time."
        </p>
      </div>
    </div>
  );
};

export default OrderPopup;