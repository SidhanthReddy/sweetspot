import React, { useEffect, useRef, useState } from 'react';

function EquationAnimation() {
      //functionality for equation quote
  const [isVisible, setIsVisible] = useState(false);
  const animationRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Reset visibility when element goes out of view
          setIsVisible(false);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the element is visible
        rootMargin: '0px'
      }
    );

    if (animationRef.current) {
      observer.observe(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        observer.unobserve(animationRef.current);
      }
    };
  }, []);
  return (
          <blockquote 
            ref={animationRef}
            className="font-parastoo text-center text-2xl sm:text-4xl text-[rgba(55,55,55,0.7)] border-l-4 border-pink-300 pl-4 my-3 sm:my-6"
          >
            <span className={`Love-highlighted-text transition-opacity duration-600 ease-in-out ${
              isVisible ? 'opacity-100 animate-fade-in-1' : 'opacity-0'
            }`}>
              Love
            </span>
            <span className={`plus-highlighted-text transition-opacity duration-600 ease-in-out ${
              isVisible ? 'opacity-100 animate-fade-in-2' : 'opacity-0'
            }`}>
              {' + '}
            </span>
            <span className={`Sugar-highlighted-text transition-opacity duration-600 ease-in-out ${
              isVisible ? 'opacity-100 animate-fade-in-3' : 'opacity-0'
            }`}>
              Sugar
            </span>
            <span className={`equal-to-highlighted-text transition-opacity duration-600 ease-in-out ${
              isVisible ? 'opacity-100 animate-fade-in-4' : 'opacity-0'
            }`}>
              {' = '}
            </span>
            <span className={`highlighted-text transition-opacity duration-600 ease-in-out ${
              isVisible ? 'opacity-100 animate-fade-in-5' : 'opacity-0'
            }`}>
              One
            </span>
            <span className={`highlighted-text transition-opacity duration-600 ease-in-out ${
              isVisible ? 'opacity-100 animate-fade-in-6' : 'opacity-0'
            }`}>
              {' Sweet'}
            </span>
            <span className={`highlighted-text transition-opacity duration-600 ease-in-out ${
              isVisible ? 'opacity-100 animate-fade-in-7' : 'opacity-0'
            }`}>
              {' Spot'}
            </span>
          </blockquote>
  )
}

export default EquationAnimation
