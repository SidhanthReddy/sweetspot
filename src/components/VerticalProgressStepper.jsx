import React, { useState, useEffect } from "react";
import "./components.css";
import FlipCardCarousel from "./FlipCardCarousel";

const VerticalProgressStepper = () => {
  const [currentStep, setCurrentStep] = useState(-1); // Start at -1 so step 0 can be animated
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState(new Set()); // Track which step cards are visible

  // You can easily modify these steps or add/remove them
  const steps = [
    {
      id: 1,
      title: "Sign Up",
      description: "Join the SweetSpot family to get started",
    },
    {
      id: 2,
      title: "Tell Us Your Dream",
      description: "Click on customize and share your cake vision",
    },
    {
      id: 3,
      title: "Tweak & Tune",
      description: "We'll suggest ideas and shape your cake with your input",
    },
    {
      id: 4,
      title: "Give Us the Green Light",
      description: "Once you're happy, we'll fire up the oven",
    },
    {
      id: 5,
      title: "Bake Time",
      description: "We craft your cake with care, love, and a little magic",
    },
    {
      id: 6,
      title: "Delivered with Love",
      description: "Your dream cake arrives fresh, just the way you wanted",
    },
  ];

  useEffect(() => {
    const animateProgress = () => {
      if (currentStep < steps.length) {
        setIsAnimating(true);

        // Animate progress bar to current step
        const targetProgress = Math.max(
          0,
          (currentStep / (steps.length - 1)) * 100
        );
        let currentProgress =
          currentStep > 0 ? ((currentStep - 1) / (steps.length - 1)) * 100 : 0;

        const progressInterval = setInterval(() => {
          currentProgress += 2;
          setProgress(currentProgress);

          if (currentProgress >= targetProgress) {
            clearInterval(progressInterval);
            setIsAnimating(false);

            // Add current step to visible steps after progress reaches it
            if (currentStep >= 0) {
              setVisibleSteps((prev) => new Set([...prev, currentStep]));
            }

            // Wait 2 seconds after showing step card before moving to next step
            setTimeout(() => {
              setCurrentStep((prev) => prev + 1);
            }, 200);
          }
        }, 20);
      } else {
        // Reset to beginning for infinite loop
        setTimeout(() => {
          setCurrentStep(-1);
          setProgress(0);
          setIsAnimating(false);
          setVisibleSteps(new Set()); // Clear all visible steps on restart
        }, 1000);
      }
    };

    const timer = setTimeout(animateProgress, 500);
    return () => clearTimeout(timer);
  }, [currentStep, steps.length]);

  return (
    <div className="p-2">
      {/* Mobile Layout */}
      <div className="block md:hidden">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="font-parastoo text-xl sm:text-2xl text-[rgba(79,79,79,0.66)] leading-tight mb-4 sm:mb-5">
            Turn Your Dream Cake into Reality at{" "}
            <span className="highlighted-text text-2xl sm:text-3xl block mt-2 sm:mt-3">
              Sweet Spot
            </span>
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed px-2 sm:px-4">
            Follow our fun, step-by-step journey to craft your perfect
            cake—personal, easy, and made with love.
          </p>
        </div>

        {/* Mobile Stepper */}
        <div className="flex justify-center mb-20 mt-16">
          <div className="relative">
            {/* Progress Bar */}
            <div
              className="relative w-2 sm:w-2.5 bg-white rounded-full shadow-lg mx-auto"
              style={{ height: "400px" }}
            >
              {/* Progress Fill */}
              <div
                className="absolute top-0 left-0 w-full bg-gradient-to-br from-[rgba(224,99,99,1)] to-[rgba(215,135,157,1)] rounded-full transition-all duration-300 ease-out"
                style={{ height: `${progress}%` }}
              />

              {/* Step Indicators */}
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className="absolute w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full border-2 border-gray-300 flex items-center justify-center shadow-lg"
                  style={{
                    left: "50%",
                    transform: "translateX(-50%) translateY(-50%)",
                    top: `${(index / (steps.length - 1)) * 100}%`,
                    borderColor:
                      progress >= (index / (steps.length - 1)) * 100
                        ? "#E06363D9"
                        : "#d1d5db",
                    zIndex: 10,
                  }}
                />
              ))}
            </div>

            {/* Step Cards for Mobile */}
            {steps.map((step, index) => {
              const isActive = visibleSteps.has(index);
              const isEven = index % 2 === 0;
              return (
                <div
                  key={step.id}
                  className={`absolute bg-white rounded-lg shadow-lg p-3 sm:p-4 border-2 border-gray-200 transition-all duration-500 transform w-44 sm:w-52 ${
                    isActive ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                  style={{
                    left: isEven ? "calc(-180px - 1rem)" : "calc(100% + 1rem)",
                    top: `${(index / (steps.length - 1)) * 100}%`,
                    transform: `translateY(-50%) ${
                      isActive ? "scale(1)" : "scale(0.95)"
                    }`,
                  }}
                >
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[rgba(224,99,99,1)] rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0">
                      {step.id}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-black text-sm sm:text-base leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-black text-xs sm:text-sm opacity-75 mt-1 sm:mt-1.5 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom text for mobile */}
        <div className="text-center px-4 sm:px-6">
          <h2 className="font-parastoo text-lg sm:text-xl text-[rgba(79,79,79,0.66)] leading-tight">
            Unwrap the <span className="Love-highlighted-text">dreams</span>{" "}
            we've turned into{" "}
            <span className="Sugar-highlighted-text">sweet moments</span>
          </h2>
        </div>
      </div>

      {/* Tablet Layout */}
      <div className="hidden md:block lg:hidden">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="font-parastoo text-4xl text-[rgba(79,79,79,0.66)] leading-tight mb-6">
            Turn Your Dream Cake into Reality at{" "}
            <span className="highlighted-text text-5xl block mt-4">
              Sweet Spot
            </span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed px-8">
            Follow our fun, step-by-step journey to craft your perfect
            cake—personal, easy, and made with love.
          </p>
        </div>

        {/* Tablet Stepper - Same as Desktop but Centered */}
        <div className="flex justify-center mb-20 mt-16">
          <div className="relative">
            {/* Progress Bar Container - Same as Desktop */}
            <div
              className="relative w-4 bg-white rounded-full shadow-lg"
              style={{ height: `${steps.length * 100}px` }}
            >
              {/* Progress Fill */}
              <div
                className="absolute top-0 left-0 w-full bg-gradient-to-br from-[rgba(224,99,99,1)] to-[rgba(215,135,157,1)] rounded-full transition-all duration-300 ease-out"
                style={{ height: `${progress}%` }}
              />

              {/* Step Indicators - Same as Desktop */}
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className="absolute w-8 h-8 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center shadow-lg"
                  style={{
                    left: "-10px",
                    top: `${(index / (steps.length - 1)) * 100}%`,
                    transform: "translateY(-50%)",
                    borderColor:
                      progress >= (index / (steps.length - 1)) * 100
                        ? " #E06363D9"
                        : "#d1d5db",
                    zIndex: 10,
                  }}
                />
              ))}
            </div>
            {/* Step Cards - Same as Desktop */}
            {steps.map((step, index) => {
              const isActive = visibleSteps.has(index);
              const isOdd = index % 2 === 0; // 0-indexed, so first step (index 0) is odd position
              return (
                <div
                  key={step.id}
                  className={`absolute w-64 bg-white rounded-lg shadow-lg p-4 border-2 border-gray-200 transition-all duration-500 transform ${
                    isActive
                      ? "opacity-100 scale-100 translate-x-0"
                      : "opacity-0 scale-95 translate-x-4"
                  }`}
                  style={{
                    left: isOdd ? "-280px" : "50px",
                    top: `${(index / (steps.length - 1)) * 100}%`,
                    transform: `translateY(-50%) ${
                      isActive ? "scale(1)" : "scale(0.95)"
                    }`,
                    transformOrigin: isOdd ? "right center" : "left center",
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[rgba(224,99,99,1)] rounded-full flex items-center justify-center text-white font-bold">
                      {step.id}
                    </div>
                    <div>
                      <h3 className="font-semibold text-black text-lg">
                        {step.title}
                      </h3>
                      <p className="text-black text-sm opacity-75">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom text for tablet */}
        <div className="text-center px-8">
          <h2 className="font-parastoo text-3xl text-[rgba(79,79,79,0.66)] leading-tight">
            Unwrap the <span className="Love-highlighted-text">dreams</span>{" "}
            we've turned into{" "}
            <span className="Sugar-highlighted-text">sweet moments</span>
          </h2>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:mt-12 xl:mt-20 lg:ml-10 xl:ml-20">
        <div className="max-w-lg xl:max-w-xl h-screen grid grid-rows-[1fr_auto] gap-6 xl:gap-8 ml-6 xl:ml-10">
          {/* Header block */}
          <div className="flex items-center justify-center ">
            <div>
              <h1 className="font-parastoo text-4xl xl:text-5xl text-[rgba(79,79,79,0.66)] leading-tight mb-3 xl:mb-4">
                Turn Your Dream Cake into Reality at{" "}
                <span className="highlighted-text text-5xl xl:text-7xl">
                  Sweet Spot
                </span>
              </h1>
              <p className="text-base xl:text-lg text-gray-600 leading-relaxed mb-6 xl:mb-8">
                Follow our fun, step-by-step journey to craft your perfect
                cake—personal, easy, and made with love.
              </p>
            </div>
          </div>

          {/* Bottom text */}
          <div>
            <h1 className="font-parastoo text-xl xl:text-2xl text-[rgba(79,79,79,0.66)] leading-tight mb-3 xl:mb-4">
              Unwrap the <span className="Love-highlighted-text">dreams</span>{" "}
              we've turned into{" "}
              <span className="Sugar-highlighted-text">sweet moments</span>
            </h1>
          </div>
        </div>

        {/* Desktop Stepper */}
        <div className="flex-1 flex items-center justify-center p-3 xl:p-4">
          <div className="relative">
            {/* Progress Bar Container */}
            <div
              className="relative w-3 xl:w-4 bg-white rounded-full shadow-lg"
              style={{ height: `${steps.length * 100}px` }}
            >
              {/* Progress Fill */}
              <div
                className="absolute top-0 left-0 w-full bg-gradient-to-br from-[rgba(224,99,99,1)] to-[rgba(215,135,157,1)] rounded-full transition-all duration-300 ease-out"
                style={{ height: `${progress}%` }}
              />

              {/* Step Indicators */}
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className="absolute w-6 h-6 xl:w-8 xl:h-8 bg-white rounded-full border-3 xl:border-4 border-gray-300 flex items-center justify-center shadow-lg"
                  style={{
                    left: "-8px",
                    top: `${(index / (steps.length - 1)) * 100}%`,
                    transform: "translateY(-50%)",
                    borderColor:
                      progress >= (index / (steps.length - 1)) * 100
                        ? " #E06363D9"
                        : "#d1d5db",
                    zIndex: 10,
                  }}
                />
              ))}
            </div>

            {/* Step Cards */}
            {steps.map((step, index) => {
              const isActive = visibleSteps.has(index);
              const isOdd = index % 2 === 0; // 0-indexed, so first step (index 0) is odd position
              return (
                <div
                  key={step.id}
                  className={`absolute w-56 xl:w-64 bg-white rounded-lg shadow-lg p-3 xl:p-4 border-2 border-gray-200 transition-all duration-500 transform ${
                    isActive
                      ? "opacity-100 scale-100 translate-x-0"
                      : "opacity-0 scale-95 translate-x-4"
                  }`}
                  style={{
                    left: isOdd ? "-280px" : "50px",
                    top: `${(index / (steps.length - 1)) * 100}%`,
                    transform: `translateY(-50%) ${
                      isActive ? "scale(1)" : "scale(0.95)"
                    }`,
                    transformOrigin: isOdd ? "right center" : "left center",
                  }}
                >
                  <div className="flex items-center space-x-2 xl:space-x-3">
                    <div className="w-8 h-8 xl:w-10 xl:h-10 bg-[rgba(224,99,99,1)] rounded-full flex items-center justify-center text-white font-bold text-sm xl:text-base">
                      {step.id}
                    </div>
                    <div>
                      <h3 className="font-semibold text-black text-base xl:text-lg">
                        {step.title}
                      </h3>
                      <p className="text-black text-sm xl:text-base opacity-75">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Arrow pointing to progress bar */}
                  <div
                    className={`absolute top-1/2 w-0 h-0 border-solid border-6 xl:border-8 ${
                      isOdd
                        ? "right-0 translate-x-full border-l-white border-r-transparent border-t-transparent border-b-transparent"
                        : "left-0 -translate-x-full border-r-white border-l-transparent border-t-transparent border-b-transparent"
                    }`}
                    style={{ transform: "translateY(-50%)" }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalProgressStepper;
