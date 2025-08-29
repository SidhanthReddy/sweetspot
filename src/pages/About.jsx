import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Users, Award, Heart, Star, MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Feather, CookingPot, Bot } from 'lucide-react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import OurJourneySection from '../components/OurJourneySection';
import { useNavigate } from 'react-router-dom';
const About = () => {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionsRef = useRef([]);
  const navigate = useNavigate();
  const smoothScrollTo = (target, duration = 2000) => {
  const element = document.scrollingElement || document.documentElement;
  const startScroll = element.scrollTop;
  const targetScroll = target.getBoundingClientRect().top + startScroll;
  const distance = targetScroll - startScroll;
  let startTime = null;

  const easeInOutCubic = (t) =>
      t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      element.scrollTop = startScroll + distance * easeInOutCubic(progress);

      if (progress < 1) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  };
  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleSections(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    sectionsRef.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const timelineData = [
    {
      year: "2021",
      title: "SweetSpot Launched",
      desc: "Started with 12 signature cake flavors in Hyderabad. Our founders baked from home kitchens to bring joy to friends, family, and first customers.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop"
    },
    {
      year: "2022", 
      title: "Express Delivery",
      desc: "Launched 3-hour cake delivery across 30+ locations. Ensured freshness, fast arrival, and hassle-free gifting experiences.",
      image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=600&h=400&fit=crop"
    },
    {
      year: "2023",
      title: "Pan-India Flavors", 
      desc: "Expanded to 100+ regions with diverse cake collections including regional and fusion flavors.",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop"
    },
    {
      year: "2026",
      title: "AI Cake Designer",
      desc: "Introducing India's first AI-based personalized cake design tool for real-time preview & customization.",
      image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&h=400&fit=crop"
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "100+", label: "Cake Varieties" }, 
    { number: "15+", label: "Cities Served" },
    { number: "100%", label: "Satisfaction Rate" }
  ];

  const values = [
    {
      icon: "❤️",
      title: "Passion for Perfection",
      desc: "Every cake is crafted with love, attention to detail, and the finest ingredients to create unforgettable moments."
    },
    {
      icon: "🌱", 
      title: "Fresh & Natural",
      desc: "We source the freshest ingredients locally and avoid artificial preservatives to ensure pure, authentic flavors."
    },
    {
      icon: "🎨",
      title: "Creative Innovation", 
      desc: "From traditional recipes to modern AI-powered designs, we blend creativity with technology for unique experiences."
    },
    {
      icon: "🤝",
      title: "Community First",
      desc: "Building lasting relationships with our customers and community through exceptional service and genuine care."
    }
  ];

  return (
    <div className="min-h-screen bg-soft-pink font-parastoo">
      <NavBar />
      {/* Hero Section - Wild One Style */}
      <section className="pt-20 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div 
              ref={el => sectionsRef.current[0] = el}
              data-index="0"
              className={`transform transition-all duration-1000 ${
                visibleSections.has(0) ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
              }`}
            >
              <div className="inline-block bg-[#fdf4f0] px-4 py-2 rounded-full mb-8">
                <span className="text-[rgba(224,99,99,0.85)] font-semibold text-sm tracking-wide uppercase">Est. 2021 • Baking Stories</span>
              </div>
              
              <h1 className="text-6xl lg:text-8xl font-black leading-none mb-8 tracking-tight">
                About
                <br />
                <span className="text-[rgba(224,99,99,0.85)]">Us</span>
              </h1>
              
              <div className="space-y-6 text-lg leading-relaxed text-gray-700 max-w-lg">
                <p className="font-medium text-xl text-gray-900">
                  "From oven to occasion — we don't just bake cakes, 
                  <span className="text-[rgba(224,99,99,0.85)]"> we bake stories that linger in every bite."</span>
                </p>
                
                <p>
                  At <span className="font-semibold text-[rgba(224,99,99,0.85)]">SweetSpot</span>, we believe that 
                  every occasion deserves a delightful dessert. From our humble beginnings in 2021 to becoming 
                  one of India's most loved cake delivery platforms.
                </p>
              </div>

              <button
                onClick={() => {
                  const target = document.getElementById("our-journey");
                  if (target) smoothScrollTo(target, 2500); // 2.5s smooth flow
                }}
                className="mt-10 bg-[rgba(224,99,99,0.85)] text-white px-8 py-4 text-sm font-semibold tracking-wide uppercase hover:bg-opacity-90 transition-colors group"
              >
                Our Story
                <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right Image */}
            <div 
              ref={el => sectionsRef.current[1] = el}
              data-index="1"
              className={`transform transition-all  duration-1000 ${
                visibleSections.has(1) ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
              }`}
              style={{transitionDelay: '200ms'}}
            >
              <div className="relative">
                <img 
                  draggable="false"
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=700&fit=crop" 
                  alt="About SweetSpot"
                  className="w-full h-[600px] object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Bold Layout */}
      <section 
        ref={el => sectionsRef.current[2] = el}
        data-index="2"
        className="py-20 px-6 lg:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16 transform transition-all duration-700 ${
            visibleSections.has(2) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center lg:text-left">
                <div className="text-5xl lg:text-7xl font-black text-[rgba(224,99,99,0.85)] mb-2 tracking-tight">
                  {stat.number}
                </div>
                <div className="text-sm font-semibold tracking-wide uppercase text-gray-800">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Cards - Asymmetric Grid */}
      <section 
        ref={el => sectionsRef.current[3] = el}
        data-index="3"
        className="py-20 px-6 lg:px-8"
      >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {[
            { icon: <Feather className="w-10 h-10 text-[rgba(224,99,99,0.85)]" />, title: "Customizable Options", desc: "Personalize every detail to make your cake uniquely yours" },
            { icon: <CookingPot className="w-10 h-10 text-[rgba(224,99,99,0.85)]" />, title: "Regional Flavors", desc: "Authentic tastes from across India in every bite" },
            { icon: <Bot className="w-10 h-10 text-[rgba(224,99,99,0.85)]" />, title: "AI-Powered Design", desc: "Revolutionary cake designing with artificial intelligence" }
          ].map((item, index) => (
            <div 
              key={index}
              className={`h-full transform transition-all duration-700 ${
                visibleSections && visibleSections.has(3) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{transitionDelay: `${index * 200}ms`}}
            >
              <div className="bg-[white] p-8 rounded-b-lg border-t-4 border-[rgba(224,99,99,0.85)] text-center h-full flex flex-col">
                <div className="text-4xl mb-6 flex justify-center items-center">{item.icon}</div> {/* Added flex for centering */}
                <h3 className="text-2xl font-black mb-4 tracking-tight text-gray-900">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed text-lg flex-grow">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </section>

      {/* Journey Timeline - Editorial Style */}
      <OurJourneySection />
     {/* <section 
        ref={el => sectionsRef.current[4] = el}
        data-index="4"
        className="py-20 px-6 lg:px-8 bg-[#f5f7fa] text-[rgba(79,79,79,0.9)]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className={`text-5xl lg:text-6xl font-black mb-8 tracking-tight transform transition-all duration-700 ${
              visibleSections.has(4) ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}>
              <span className="text-[rgba(79,79,79,0.9)]">Our</span> <span className="text-[rgba(224,99,99,0.85)]">Journey</span>
            </h2>
            <p className={`text-xl text-[rgba(79,79,79,0.9)] max-w-2xl transform transition-all duration-700 ${
              visibleSections.has(4) ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`} style={{transitionDelay: '200ms'}}>
              From humble beginnings to sweet success
            </p>
          </div>

          <div className="space-y-20">
            {timelineData.map((item, index) => (
              <div 
                key={index}
                className={`grid lg:grid-cols-5 gap-8 lg:gap-16 items-center transform transition-all duration-700 ${
                  visibleSections.has(4) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                } ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
                style={{transitionDelay: `${400 + index * 200}ms`}}
              >
                
                <div className={`lg:col-span-2 ${index % 2 === 1 ? 'lg:col-start-4' : ''}`}>
                  <div className="inline-block bg-[rgba(224,99,99,0.85)] px-4 py-2 rounded-full mb-6">
                    <span className="font-black text-sm tracking-wide text-white">{item.year}</span>
                  </div>
                  <h3 className="text-3xl font-black mb-4 tracking-tight text-[rgba(79,79,79,0.9)]">{item.title}</h3>
                  <p className="text-[rgba(79,79,79,0.9)] text-lg leading-relaxed">{item.desc}</p>
                </div>

              
                <div className={`lg:col-span-3 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-80 object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>*/}

      {/* Values Section */}
      <section 
        ref={el => sectionsRef.current[5] = el}
        data-index="5"
        className="py-20 px-6 lg:px-8 bg-[#fdf4f0]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-5xl lg:text-6xl font-black mb-8 tracking-tight transform transition-all duration-700 ${
              visibleSections.has(5) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              Our <span className="text-[rgba(224,99,99,0.85)]">Values</span>
            </h2>
            <p className={`text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto transform transition-all duration-700 ${
              visibleSections.has(5) ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`} style={{transitionDelay: '200ms'}}>
              The principles that guide every cake we bake and every smile we create
            </p>
          </div>

          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 transform transition-all duration-700 ${
            visibleSections.has(5) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{transitionDelay: '400ms'}}>
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-none border-l-4 border-[rgba(224,99,99,0.85)]"
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-3xl">{value.icon}</span>
                  <h3 className="text-2xl font-black tracking-tight text-gray-900">{value.title}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg ml-16">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={el => sectionsRef.current[6] = el}
        data-index="6"
        className="py-20 px-6 lg:px-8 bg-[rgba(224,99,99,0.85)] text-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className={`grid lg:grid-cols-2 gap-16 items-center transform transition-all duration-700 ${
            visibleSections.has(6) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            {/* Left Content */}
            <div>
              <h3 className="text-4xl lg:text-5xl font-black mb-8 tracking-tight">
                Want To Be A Part Of Us?
              </h3>
              
              <div className="space-y-6 text-lg mb-10">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">✨</span>
                  <div>
                    <strong>Flexible schedules</strong> — Work when you're at your creative best.
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">🎓</span>
                  <div>
                    <strong>Learning & growth</strong> — Upskill with hands-on experiences and expert mentorship.
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">🤝</span>
                  <div>
                    <strong>Inclusive & friendly team</strong> — We rise together like our favorite sponge cakes.
                  </div>
                </div>
              </div>

              <button className="bg-gray-800 text-white px-8 py-4 text-sm font-semibold tracking-wide uppercase hover:bg-gray-700 transition-colors group" onClick={() => {navigate('/contact-us');window.scrollTo(0, 0);}}>
                Contact Us
                <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right Image */}
            <div>
              <img 
                draggable="false"
                src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=500&h=600&fit=crop" 
                alt="Join Us" 
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
