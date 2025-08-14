import React from "react";

const AboutHero = () => {
  return (
    <section className="relative bg-[#fdf4f0] text-[rgba(79,79,79,0.75)] py-20 px-4 min-h-screen flex items-center">
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[rgba(224,99,99,0.05)] rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[rgba(252,232,228,0.8)] rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[rgba(224,99,99,0.03)] rounded-full blur-lg"></div>
        <div className="absolute bottom-1/3 right-1/3 w-28 h-28 bg-[rgba(253,244,240,0.9)] rounded-full blur-lg"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center w-full">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white bg-opacity-90 px-6 py-3 rounded-full mb-8 shadow-lg border border-[rgba(224,99,99,0.1)]">
          <div className="w-2 h-2 bg-[rgba(224,99,99,0.85)] rounded-full"></div>
          <span className="text-[rgba(79,79,79,0.75)] font-semibold font-parastoo text-sm">Est. 2021 • Baking Stories</span>
        </div>

        <div className="flex justify-center items-center text-center min-h-[20vh]">
            <h1 className="flex flex-wrap items-start justify-center gap-5 text-5xl md:text-7xl lg:text-8xl font-bold text-[rgba(79,79,79,0.75)] font-parastoo mb-3 leading-tight">
                <span>ABOUT</span>
                <span className="text-[rgba(224,99,99,0.85)]">US</span>
            </h1>
        </div>

        
        {/* Quote */}
        <p className="text-xl md:text-2xl lg:text-3xl text-[rgba(79,79,79,0.75)] font-parastoo max-w-5xl mx-auto leading-relaxed mb-8 italic">
          "From oven to occasion — we don't just bake cakes, 
          <span className="block font-bold text-[rgba(224,99,99,0.85)] mt-2">we bake stories that linger in every bite."</span>
        </p>

        {/* Description Card */}
        <div className="bg-white bg-opacity-90 p-8 md:p-10 rounded-3xl text-[rgba(79,79,79,0.85)] shadow-lg border border-[rgba(224,99,99,0.1)] max-w-4xl mx-auto">
          <p className="text-lg md:text-xl leading-relaxed font-parastoo">
            At <span className="text-[rgba(224,99,99,0.85)] font-semibold">SweetSpot</span>, we believe that 
            <em className="mx-2">every occasion deserves a delightful dessert</em>. 
            From our humble beginnings in 2021 to becoming one of India's most loved cake delivery platforms, 
            our journey has always been about <strong className="text-[rgba(224,99,99,0.85)]">baking smiles</strong>.
            <br /><br />
            With customizable options, regional flavors, and even AI-powered cake designing, 
            we're here to make your moments <strong className="text-[rgba(224,99,99,0.85)]">extra special</strong> — one slice at a time.
          </p>
        </div>
              {/* Feature Cards */}
      <div className="grid grid-cols-1 mt-6 md:grid-cols-3 gap-4">
        <div className="bg-white bg-opacity-90 p-6 rounded-2xl shadow-md border border-[rgba(224,99,99,0.1)] hover:shadow-lg hover:transform hover:scale-105 transition-all duration-300">
          <div className="w-12 h-12 bg-[rgba(224,99,99,0.1)] rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">🎨</span>
          </div>
          <h4 className="text-lg font-bold text-[rgba(224,99,99,0.85)] font-parastoo mb-2">Customizable Options</h4>
          <p className="text-[rgba(79,79,79,0.75)] font-parastoo text-sm">Personalize every detail to make your cake uniquely yours</p>
        </div>

        <div className="bg-white bg-opacity-90 p-6 rounded-2xl shadow-md border border-[rgba(224,99,99,0.1)] hover:shadow-lg hover:transform hover:scale-105 transition-all duration-300">
          <div className="w-12 h-12 bg-[rgba(224,99,99,0.1)] rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">🌶️</span>
          </div>
          <h4 className="text-lg font-bold text-[rgba(224,99,99,0.85)] font-parastoo mb-2">Regional Flavors</h4>
          <p className="text-[rgba(79,79,79,0.75)] font-parastoo text-sm">Authentic tastes from across India in every bite</p>
        </div>

        <div className="bg-white bg-opacity-90 p-6 rounded-2xl shadow-md border border-[rgba(224,99,99,0.1)] hover:shadow-lg hover:transform hover:scale-105 transition-all duration-300">
          <div className="w-12 h-12 bg-[rgba(224,99,99,0.1)] rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">🤖</span>
          </div>
          <h4 className="text-lg font-bold text-[rgba(224,99,99,0.85)] font-parastoo mb-2">AI-Powered Design</h4>
          <p className="text-[rgba(79,79,79,0.75)] font-parastoo text-sm">Revolutionary cake designing with artificial intelligence</p>
        </div>
      </div>

      {/* Bottom Message */}
      <div className="mt-8 text-center">
        <div className="bg-[rgba(224,99,99,0.05)] p-6 rounded-2xl border border-[rgba(224,99,99,0.1)]">
          <p className="text-lg md:text-xl text-[rgba(79,79,79,0.85)] font-parastoo leading-relaxed">
            We're here to make your moments <strong className="text-[rgba(224,99,99,0.85)]">extra special</strong> — one slice at a time. ✨
          </p>
        </div>
      </div>
      </div>
    </section>
  );
};

export default AboutHero;