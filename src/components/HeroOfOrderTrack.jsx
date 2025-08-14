import React from 'react';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

const HeroOfOrderTrack = () => {
  const features = [
    {
      icon: Package,
      title: "Order Placed",
      description: "Your sweet order is confirmed"
    },
    {
      icon: Clock,
      title: "Preparing",
      description: "Fresh baking in progress"
    },
    {
      icon: Truck,
      title: "Out for Delivery",
      description: "On the way to you"
    },
    {
      icon: CheckCircle,
      title: "Delivered",
      description: "Enjoy your treats!"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        
        {/* Main Hero Content */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold text-[rgba(79,79,79,0.7)] font-parastoo mb-6 leading-tight">
            Track Your
            <span className="block text-[rgba(224,99,99,0.85)]">Sweet Journey</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[rgba(79,79,79,0.6)] font-parastoo max-w-3xl mx-auto leading-relaxed mb-8">
            From our ovens to your doorstep - follow every delicious step of your order's journey with real-time updates
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <button className="w-full sm:w-auto px-8 py-4 bg-[rgba(224,99,99,0.85)] text-white rounded-xl font-semibold font-parastoo hover:bg-[rgba(224,99,99,0.95)] focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all duration-200 shadow-[0_4px_20px_rgba(244,63,94,0.2)]">
              Track My Order
            </button>
            
            <button className="w-full sm:w-auto px-8 py-4 border-2 border-[rgba(224,99,99,0.85)] text-[rgba(224,99,99,0.85)] rounded-xl font-semibold font-parastoo hover:bg-[rgba(224,99,99,0.85)] hover:text-white transition-all duration-200">
              Order Again
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            
            return (
              <div 
                key={index}
                className="bg-white rounded-3xl border border-rose-200 shadow-[0_4px_20px_rgba(244,63,94,0.1)] p-8 text-center transition-all duration-300 hover:shadow-[0_8px_30px_rgba(244,63,94,0.15)] hover:transform hover:scale-105"
              >
                <div className="w-16 h-16 bg-[rgba(224,99,99,0.1)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-[rgba(224,99,99,0.85)]" />
                </div>
                
                <h3 className="text-lg font-bold text-[rgba(79,79,79,0.7)] font-parastoo mb-2">
                  {feature.title}
                </h3>
                
                <p className="text-[rgba(79,79,79,0.6)] font-parastoo">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-3xl border border-rose-200 shadow-[0_4px_20px_rgba(244,63,94,0.1)] p-8 max-w-2xl mx-auto">
            <p className="text-lg text-[rgba(79,79,79,0.7)] font-parastoo leading-relaxed">
              <span className="font-bold text-[rgba(224,99,99,0.85)]">Real-time notifications</span> keep you updated at every step. 
              From the moment we start baking to the second it reaches your door - 
              <span className="font-semibold"> never miss a sweet moment! 🍰</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroOfOrderTrack;