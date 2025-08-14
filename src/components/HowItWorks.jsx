import React from 'react';

// Mock Slider component for demonstration
const Slider = ({ children, ...props }) => {
  return <div className="relative">{children[0]}</div>;
};

const HowItWorksSection = () => {
  // Mock images - replace with your actual images
  const one = "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=380&fit=crop";
  const two = "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600&h=380&fit=crop";
  const three = "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&h=380&fit=crop";
  const four = "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&h=380&fit=crop";

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const steps = [
    { 
      title: "Browse & Select", 
      desc: "Explore our curated selection of delicious cakes and desserts for every mood and occasion.",
      icon: "🔍"
    },
    { 
      title: "Customise", 
      desc: "Personalize your cake by choosing flavors, designs, messages, and special requests.",
      icon: "🎨"
    },
    { 
      title: "Place Order", 
      desc: "Add your favorites to the cart and place the order in a few easy steps. Smooth and quick!",
      icon: "🛒"
    },
    { 
      title: "Get Delivered", 
      desc: "Sit back and relax — your freshly baked cake will be delivered right to your doorstep.",
      icon: "🚚"
    },
  ];

  return (
    <section className="py-16 px-4 bg-[#fdf4f0] border-t-4 border-[rgba(224,99,99,0.1)] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-[rgba(224,99,99,0.1)] rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-[rgba(224,99,99,0.15)] rounded-full blur-xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[rgba(79,79,79,0.9)] mb-4">
            How It <span className="text-[rgba(224,99,99,0.85)]">Works</span>
          </h2>
          <p className="text-lg text-[rgba(79,79,79,0.7)] max-w-2xl mx-auto">
            From browsing to doorstep delivery, we've made ordering your perfect cake as sweet as our desserts
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[rgba(224,99,99,0.85)] to-[rgba(224,99,99,0.5)] mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Image Slider Section */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative">
              <Slider {...sliderSettings}>
                {[one, two, three, four].map((img, i) => (
                  <div key={i} className="px-2 flex justify-center">
                    <div className="w-full max-w-[600px] h-[400px] rounded-2xl shadow-2xl overflow-hidden relative group">
                      <img 
                        src={img} 
                        alt={`slide-${i}`} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    </div>
                  </div>
                ))}
              </Slider>
              
              {/* Decorative frame */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[rgba(224,99,99,0.2)] to-[rgba(224,99,99,0.1)] rounded-3xl -z-10 blur-sm"></div>
            </div>
          </div>

          {/* Steps Section */}
          <div className="w-full lg:w-1/2 lg:pl-8">
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="relative group pl-16">
                  {/* Step connector line */}
                  {index < 3 && (
                    <div className="absolute left-6 top-14 w-0.5 h-16 bg-gradient-to-b from-[rgba(224,99,99,0.4)] to-[rgba(224,99,99,0.2)]"></div>
                  )}
                  
                  {/* Step number and icon */}
                  <div className="absolute left-0 top-0 flex flex-col items-center">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-[rgba(224,99,99,0.85)] to-[rgba(224,99,99,0.7)] text-white flex items-center justify-center rounded-2xl font-bold text-lg shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                        {index + 1}
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-br from-[rgba(224,99,99,0.3)] to-transparent rounded-2xl -z-10 blur-sm"></div>
                    </div>
                  </div>

                  {/* Step content */}
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 transition-all duration-300 group-hover:shadow-xl group-hover:bg-white/80 group-hover:transform group-hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{step.icon}</span>
                      <h4 className="text-xl md:text-2xl font-bold text-[rgba(79,79,79,0.9)] group-hover:text-[rgba(224,99,99,0.85)] transition-colors duration-300">
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-[rgba(79,79,79,0.7)] leading-relaxed text-base">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to action */}
            <div className="mt-12 text-center lg:text-left">
              <button className="bg-gradient-to-r from-[rgba(224,99,99,0.85)] to-[rgba(224,99,99,0.7)] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 hover:from-[rgba(224,99,99,0.9)] hover:to-[rgba(224,99,99,0.8)]">
                Start Your Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;