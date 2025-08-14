import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import images
import bakeImg from "../assets/bake.jpg";
import mapImg from "../assets/map.jpg";
import rideImg from "../assets/ride.jpg";
import payImg from "../assets/pay.jpg";
import craveImg from "../assets/crave.webp";

const steps = [
  {
    img: bakeImg,
    text: "Crafting sweetness with love",
    description: "Every treat is made with passion and care",
  },
  {
    img: mapImg,
    text: "Finding your way to happiness",
    description: "We map the perfect route to your door",
  },
  {
    img: rideImg,
    text: "Your sweetness is on the way",
    description: "Fresh treats delivered with speed and care",
  },
  {
    img: payImg,
    text: "Simple and secure delivery",
    description: "Seamless transactions for your peace of mind",
  },
  {
    img: craveImg,
    text: "Your sweet moment has arrived",
    description: "Time to indulge in pure sweetness",
  },
];

export default function DeliverySteps() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
     <div className="min-h-screen bg-soft-pink pt-8">
    
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 ">
          <div className="flex flex-row justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="relative"
              >
                {/* Circular Image Container */}
                <div
                  className="relative overflow-hidden rounded-full shadow-lg w-80 h-80 md:w-96 md:h-96 mx-auto"
                  style={{
                    background: "rgba(224, 99, 99, 0.85)",
                    padding: "8px",
                  }}
                >
                  <img
                    src={steps[currentStep].img}
                    alt={steps[currentStep].text}
                    className="w-full h-full object-cover rounded-full"
                  />

                  {/* Subtle overlay line */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1"
                    style={{ background: "rgba(224, 99, 99, 0.85)" }}
                  ></div>
                </div>

                {/* Step indicator line */}
                <div className="mt-6 flex justify-center">
                  <div className="flex space-x-2">
                    {steps.map((_, index) => (
                      <div
                        key={index}
                        className={`h-0.5 transition-all duration-500 ${
                          index === currentStep ? "w-8" : "w-2"
                        }`}
                        style={{
                          backgroundColor:
                            index === currentStep
                              ? "rgba(224, 99, 99, 0.85)"
                              : "rgba(79,79,79,0.3)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Text Content */}
          <div className="text-center lg:text-left pl-12 pt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Step Number */}
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <span
                    className="text-sm font-medium tracking-wider uppercase"
                    style={{ color: "rgba(224, 99, 99, 0.85)" }}
                  >
                    Step {currentStep + 1}
                  </span>
                  <div
                    className="flex-1 h-px max-w-12"
                    style={{ backgroundColor: "rgba(224, 99, 99, 0.85)" }}
                  ></div>
                </div>

                {/* Main Heading */}
                <h2
                  className="text-3xl font-semibold leading-tight"
                  style={{ color: "rgba(79,79,79,0.7)" }}
                >
                  {steps[currentStep].text}
                </h2>

                {/* Description */}
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: "rgba(79,79,79,0.7)" }}
                >
                  {steps[currentStep].description}
                </p>

                {/* Connection line */}
                <div className="pt-4">
                  <div
                    className="w-16 h-0.5 mx-auto lg:mx-0"
                    style={{ backgroundColor: "rgba(215, 135, 157, 1)" }}
                  ></div>
                </div>
              </motion.div>
            </AnimatePresence>
          
        </div>

        {/* Bottom Section */}
       
      </div>
    </div>
  );
}