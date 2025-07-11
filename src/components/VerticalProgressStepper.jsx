import React, { useState, useEffect } from 'react';
import './components.css';
import FlipCardCarousel from './FlipCardCarousel';
const VerticalProgressStepper = () => {
  const [currentStep, setCurrentStep] = useState(-1); // Start at -1 so step 0 can be animated
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState(new Set()); // Track which step cards are visible

  // You can easily modify these steps or add/remove them
    const steps = [
      { id: 1, title: "Sign Up", description: "Join the SweetSpot family to get started" },
      { id: 2, title: "Tell Us Your Dream", description: "Click on customize and share your cake vision" },
      { id: 3, title: "Tweak & Tune", description: "We’ll suggest ideas and shape your cake with your input" },
      { id: 4, title: "Give Us the Green Light", description: "Once you're happy, we’ll fire up the oven" },
      { id: 5, title: "Bake Time", description: "We craft your cake with care, love, and a little magic" },
      { id: 6, title: "Delivered with Love", description: "Your dream cake arrives fresh, just the way you wanted" },
    ];


  useEffect(() => {
    const animateProgress = () => {
      if (currentStep < steps.length) {
        setIsAnimating(true);
        
        // Animate progress bar to current step
        const targetProgress = Math.max(0, (currentStep / (steps.length - 1)) * 100);
        let currentProgress = currentStep > 0 ? ((currentStep - 1) / (steps.length - 1)) * 100 : 0;
        
        const progressInterval = setInterval(() => {
          currentProgress += 2;
          setProgress(currentProgress);
          
          if (currentProgress >= targetProgress) {
            clearInterval(progressInterval);
            setIsAnimating(false);
            
            // Add current step to visible steps after progress reaches it
            if (currentStep >= 0) {
              setVisibleSteps(prev => new Set([...prev, currentStep]));
            }
            
            // Wait 2 seconds after showing step card before moving to next step
            setTimeout(() => {
              setCurrentStep(prev => prev + 1);
            }, 1000);
          }
        }, 50);
      } else {
        // Reset to beginning for infinite loop
        setTimeout(() => {
          setCurrentStep(-1);
          setProgress(0);
          setIsAnimating(false);
          setVisibleSteps(new Set()); // Clear all visible steps on restart
        }, 2000);
      }
    };

    const timer = setTimeout(animateProgress, 500);
    return () => clearTimeout(timer);
  }, [currentStep, steps.length]);

  return (
      <div className="flex-1 flex justify-center p-4 mt-20 ml-20">
        <div className="max-w-lg h-screen grid grid-rows-[1fr_auto] gap-8 ml-10">
          {/* …first block… */}
          <div className="flex items-center justify-center">
            <div>
              <h1 className="font-parastoo text-5xl text-[rgba(79,79,79,0.66)] leading-tight mb-4">
                Turn Your Dream Cake into Reality at <span className="highlighted-text text-7xl">Sweet Spot</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Follow our fun, step-by-step journey to craft your perfect cake—personal, easy, and made with love.
              </p>
            </div>
          </div>

          {/* pinned to bottom */}
          <div>
            <h1 className="font-parastoo text-2xl text-[rgba(79,79,79,0.66)] leading-tight mb-4">
              Unwrap the <span className="Love-highlighted-text">dreams</span> we’ve turned into <span className="Sugar-highlighted-text">sweet moments</span>
            </h1>
          </div>
        </div>
      {/* Right side - Stepper */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="relative">
          {/* Progress Bar Container */}
          <div className="relative w-4 bg-white rounded-full shadow-lg" style={{ height: `${steps.length * 120}px` }}>
            {/* Progress Fill */}
            <div 
              className="absolute top-0 left-0 w-full bg-gradient-to-br from-[rgba(224,99,99,1)] to-[rgba(215,135,157,1)] rounded-full transition-all duration-300 ease-out"
              style={{ height: `${progress}%` }}
            />
            
            {/* Step Indicators */}
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="absolute w-8 h-8 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center shadow-lg"
                style={{
                  left: '-10px',
                  top: `${(index / (steps.length - 1)) * 100}%`,
                  transform: 'translateY(-50%)',
                  borderColor: progress >= (index / (steps.length - 1)) * 100 ? ' #E06363D9' : '#d1d5db',
                  zIndex: 10
                }}
              >
                {/* Empty white circle - no inner dot */}
              </div>
            ))}
          </div>

          {/* Step Cards */}
          {steps.map((step, index) => {
            const isActive = visibleSteps.has(index);
            const isOdd = index % 2 === 0; // 0-indexed, so first step (index 0) is odd position
            
            return (
              <div
                key={step.id}
                className={`absolute w-64 bg-white rounded-lg shadow-lg p-4 border-2 border-gray-200 transition-all duration-500 transform ${
                  isActive 
                    ? 'opacity-100 scale-100 translate-x-0' 
                    : 'opacity-0 scale-95 translate-x-4'
                }`}
                style={{
                  left: isOdd ? '-280px' : '50px',
                  top: `${(index / (steps.length - 1)) * 100}%`,
                  transform: `translateY(-50%) ${isActive ? 'scale(1)' : 'scale(0.95)'}`,
                  transformOrigin: isOdd ? 'right center' : 'left center'
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[rgba(224,99,99,1)] rounded-full flex items-center justify-center text-white font-bold">
                    {step.id}
                  </div>
                  <div>
                    <h3 className="font-semibold text-black text-lg">{step.title}</h3>
                    <p className="text-black text-sm opacity-75">{step.description}</p>
                  </div>
                </div>
                
                {/* Arrow pointing to progress bar */}
                <div
                  className={`absolute top-1/2 w-0 h-0 border-solid border-8 ${
                    isOdd 
                      ? 'right-0 translate-x-full border-l-white border-r-transparent border-t-transparent border-b-transparent' 
                      : 'left-0 -translate-x-full border-r-white border-l-transparent border-t-transparent border-b-transparent'
                  }`}
                  style={{ transform: 'translateY(-50%)' }}
                />
              </div>
            );
          })}
        </div>

        {/* Status */}

      </div>
    </div>
  );
};

export default VerticalProgressStepper;