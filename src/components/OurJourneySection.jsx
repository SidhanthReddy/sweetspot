import React, { useState, useEffect, useRef } from 'react';

const OurJourneySection = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [activeTimeline, setActiveTimeline] = useState(0);
  const sectionRef = useRef(null);
  const timelineRefs = useRef([]);

  // Mock journey data - replace with your actual content
  const journeyMilestones = [
    {
      year: "2018",
      title: "Sweet Beginnings",
      description: "Started our journey with a small home kitchen and a big dream to bring joy through handcrafted cakes and desserts.",
      icon: "🏠",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      color: "from-pink-400 to-rose-400"
    },
    {
      year: "2019",
      title: "First Bakery",
      description: "Opened our first physical store, welcoming customers with fresh aromas and warm smiles every morning.",
      icon: "🏪",
      image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400&h=300&fit=crop",
      color: "from-orange-400 to-red-400"
    },
    {
      year: "2020",
      title: "Digital Expansion",
      description: "Launched online ordering and delivery services, adapting to serve our community during challenging times.",
      icon: "💻",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      color: "from-blue-400 to-indigo-400"
    },
    {
      year: "2021",
      title: "Award Recognition",
      description: "Received 'Best Local Bakery' award and expanded our team to meet growing demand for our signature creations.",
      icon: "🏆",
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop",
      color: "from-yellow-400 to-orange-400"
    },
    {
      year: "2022",
      title: "Custom Creations",
      description: "Introduced personalized cake design services, making every celebration unique and memorable.",
      icon: "🎨",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
      color: "from-purple-400 to-pink-400"
    },
    {
      year: "2024",
      title: "Sweet Future",
      description: "Continuing to innovate with new flavors, sustainable practices, and expanding our reach to spread more sweetness.",
      icon: "🚀",
      image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=300&fit=crop",
      color: "from-green-400 to-teal-400"
    }
  ];

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index'));
            setVisibleItems(prev => new Set([...prev, index]));
            setActiveTimeline(index);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-50px' }
    );

    timelineRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-12 border-t-4 border-[rgba(224,99,99,0.08)] px-4 b bg-[#fdf4f0]overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-6 w-40 h-40 bg-gradient-to-r from-[rgba(224,99,99,0.1)] to-transparent rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-16 right-8 w-48 h-48 bg-gradient-to-l from-[rgba(224,99,99,0.08)] to-transparent rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block">
            <h2 className="text-5xl md:text-6xl font-bold text-[rgba(79,79,79,0.9)] mb-6 relative">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[rgba(224,99,99,0.85)] to-[rgba(224,99,99,0.6)]">Journey</span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[rgba(224,99,99,0.5)] to-transparent rounded-full"></div>
            </h2>
          </div>
          <p className="text-xl text-[rgba(79,79,79,0.7)] max-w-3xl mx-auto leading-relaxed">
            From humble beginnings to sweet success - discover the milestones that shaped our passion for creating unforgettable moments
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[rgba(224,99,99,0.3)] via-[rgba(224,99,99,0.5)] to-[rgba(224,99,99,0.3)] rounded-full hidden lg:block">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[rgba(224,99,99,0.85)] rounded-full shadow-md animate-pulse"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[rgba(224,99,99,0.85)] rounded-full shadow-md animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>

          {/* Timeline Items */}
          <div className="space-y-8 lg:space-y-12">
            {journeyMilestones.map((milestone, index) => (
              <div
                key={index}
                ref={el => timelineRefs.current[index] = el}
                data-index={index}
                className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content Card */}
                <div className={`w-full lg:w-5/12 transform transition-all duration-1000 ${
                  visibleItems.has(index) 
                    ? 'translate-x-0 opacity-100' 
                    : index % 2 === 0 
                      ? '-translate-x-20 opacity-0' 
                      : 'translate-x-20 opacity-0'
                }`}>
                  <div className="group relative">
                    {/* Card */}
                    <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-5 shadow-lg border border-white/40 hover:shadow-xl hover:bg-white/80 transition-all duration-500 hover:scale-105">
                      {/* Year badge */}
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${milestone.color} text-white font-bold text-xs mb-3 shadow-md`}>
                        <span className="text-sm">{milestone.icon}</span>
                        {milestone.year}
                      </div>
                      
                      <h3 className="text-lg md:text-xl font-bold text-[rgba(79,79,79,0.9)] mb-3 group-hover:text-[rgba(224,99,99,0.85)] transition-colors duration-300">
                        {milestone.title}
                      </h3>
                      
                      <p className="text-[rgba(79,79,79,0.7)] text-sm leading-relaxed">
                        {milestone.description}
                      </p>

                      {/* Decorative elements */}
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-[rgba(224,99,99,0.2)] rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-[rgba(224,99,99,0.15)] rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{transitionDelay: '100ms'}}></div>
                    </div>
                  </div>
                </div>

                {/* Timeline Node */}
                <div className={`hidden lg:flex w-2/12 justify-center transform transition-all duration-700 ${
                  visibleItems.has(index) ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`} style={{transitionDelay: `${index * 200}ms`}}>
                  <div className="relative">
                    <div className={`w-10 h-10 bg-gradient-to-br ${milestone.color} rounded-full flex items-center justify-center text-white text-sm shadow-xl animate-bounce`} 
                         style={{animationDelay: `${index * 300}ms`, animationDuration: '2s'}}>
                      {milestone.icon}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full"></div>
                    <div className={`absolute -inset-1 bg-gradient-to-br ${milestone.color} opacity-20 rounded-full blur-sm animate-pulse`}></div>
                  </div>
                </div>

                {/* Image */}
                <div className={`w-full lg:w-5/12 transform transition-all duration-1000 ${
                  visibleItems.has(index) 
                    ? 'translate-x-0 opacity-100' 
                    : index % 2 === 0 
                      ? 'translate-x-20 opacity-0' 
                      : '-translate-x-20 opacity-0'
                }`} style={{transitionDelay: `${200 + index * 100}ms`}}>
                  <div className="group relative overflow-hidden rounded-2xl shadow-lg">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img 
                        src={milestone.image} 
                        alt={milestone.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    
                    {/* Image overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${milestone.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                    
                    {/* Floating year indicator */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 font-bold text-sm text-[rgba(79,79,79,0.8)] shadow-md transform transition-all duration-300 group-hover:scale-110">
                      {milestone.year}
                    </div>
                    
                    {/* Decorative corner elements */}
                    <div className="absolute top-0 left-0 w-0 h-0 border-l-[20px] border-l-white/20 border-b-[20px] border-b-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 right-0 w-0 h-0 border-r-[20px] border-r-white/20 border-t-[20px] border-t-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="inline-block bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/40">
            <h3 className="text-xl font-bold text-[rgba(79,79,79,0.9)] mb-3">
              Ready to be part of our story?
            </h3>
            <p className="text-[rgba(79,79,79,0.7)] mb-4 max-w-sm text-sm">
              Join thousands of satisfied customers who have made their celebrations sweeter with us
            </p>
            <button className="group relative bg-gradient-to-r from-[rgba(224,99,99,0.85)] to-[rgba(224,99,99,0.7)] text-white px-6 py-3 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 overflow-hidden">
              <span className="relative z-10">Order Your Sweet Memory</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[rgba(224,99,99,0.9)] to-[rgba(224,99,99,0.8)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-[rgba(224,99,99,0.4)] to-transparent rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurJourneySection;