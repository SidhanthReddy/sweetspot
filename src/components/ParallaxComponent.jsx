import React, { useEffect, useState, useRef } from 'react';

function ParallaxComponent({ content, image }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const rect = parallaxRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementTop = rect.top;
        const elementHeight = rect.height;
        
        // Calculate how much of the element is visible (0 to 1)
        const visibleProgress = Math.max(0, Math.min(1, 
          (windowHeight - elementTop) / (windowHeight + elementHeight)
        ));
        
        setScrollProgress(visibleProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate background position - starts at bottom, moves to top
  const backgroundPositionY = 80 - (scrollProgress *100); // 100% to 0%

  return (
    <div
      ref={parallaxRef}
      className="relative w-full h-[400px] sm:h-[800px] overflow-hidden flex items-center justify-center"
    >
      {/* Parallax background */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: `center ${backgroundPositionY}%`,
          backgroundSize: 'cover'
        }}
      />
      
      {/* Content overlay */}
      <div className="relative z-10">
        <blockquote className="bg-none bg-opacity-80 p-6 rounded-xl text-white  text-center max-w-4xl">
          <p className="font-parastoo text-center text-3xl sm:text-5xl">
            {content}
          </p>
        </blockquote>
      </div>
    </div>
  );
}

export default ParallaxComponent;