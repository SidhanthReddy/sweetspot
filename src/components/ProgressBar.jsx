import { Check } from "lucide-react";

export default function ProgressBar({ currentStep }) {
  const steps = [
    {
      number: 1,
      title: "Decoration List",
      description: "Select your decoration list",
    },
    { number: 2, title: "Review Order", description: "Confirm your order" },
    { number: 3, title: "Payment", description: "Complete your purchase" },
  ];

  return (
    <div className="w-full mb-10 flex justify-center">
      <div className="flex items-center justify-center gap-4 sm:gap-10">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            {/* Step circle */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  currentStep > step.number
                    ? "bg-gray-200 border-gray-200 text-black transform scale-110"
                    : currentStep === step.number
                    ? "bg-red-400 border-red-400 text-white transform scale-110 shadow-lg"
                    : "bg-gray-100 border-gray-300 text-gray-500"
                }`}
              >
                {currentStep > step.number ? (
                  <Check className="w-5 h-5 animate-bounce" />
                ) : (
                  <span className="text-sm font-bold">{step.number}</span>
                )}
              </div>
              {/* Step title and description */}
              <div className="text-center mt-2">
                <p
                  className={`text-sm font-semibold ${
                    currentStep >= step.number
                      ? "text-gray-900"
                      : "text-gray-500"
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-xs text-gray-500 hidden sm:block">
                  {step.description}
                </p>
              </div>
            </div>

            {/* Line between steps */}
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 w-8 sm:w-16 mx-2 sm:mx-4 transition-all duration-500 ${
                  currentStep > step.number ? "bg-red-300" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
