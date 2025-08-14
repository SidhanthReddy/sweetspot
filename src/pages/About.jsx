import React from "react";
import "@fontsource/parastoo";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import one from "../assets/one.png";
import two from "../assets/two.png";
import three from "../assets/three.png";
import four from "../assets/four.png";
import head from "../assets/head.jpg";
import join from "../assets/join.png";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import AboutHero from "../components/AboutHero";
import HowItWorksSection from "../components/HowItWorks";
import OurJourneySection from "../components/OurJourneySection";
const timelineData = [
  {
    year: "2021",
    title: "SweetSpot Launched",
    desc: "Started with 12 signature cake flavors in Hyderabad. Our founders baked from home kitchens to bring joy to friends, family, and first customers.",
    icon: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
    color: "bg-[#f6c90e]",
  },
  {
    year: "2022",
    title: "Express Delivery",
    desc: "Launched 3-hour cake delivery across 30+ locations. Ensured freshness, fast arrival, and hassle-free gifting experiences.",
    icon: "https://cdn-icons-png.flaticon.com/512/1159/1159633.png",
    color: "bg-[#f78fb3]",
  },
  {
    year: "2023",
    title: "Pan-India Flavors",
    desc: "Expanded to 100+ regions with diverse cake collections including regional and fusion flavors.",
    icon: "https://cdn-icons-png.flaticon.com/512/2917/2917242.png",
    color: "bg-[#63cdda]",
  },
  {
    year: "2026",
    title: "AI Cake Designer",
    desc: "Introducing India's first AI-based personalized cake design tool for real-time preview & customization.",
    icon: "https://cdn-icons-png.flaticon.com/512/706/706164.png",
    color: "bg-[#786fa6]",
  },
];

const About = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    autoplay: true,
    autoplaySpeed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="font-parastoo bg-[#fdf4f0] text-[rgba(79,79,79,0.75)]">
      <NavBar />
      {/* Hero Section */}
      <AboutHero />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Our Journey */}
      <OurJourneySection />

      {/* Why Choose Us Section */}
      <section className="bg-[#fce8e4] py-14 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left Side */}
          <div className="flex-1 space-y-5">
            <h3 className="text-3xl font-semibold text-[rgba(79,79,79,0.7)]">Why Choose Us</h3>
            <ul className="space-y-3 text-lg leading-relaxed">
              <li>✨ <strong>Flexible schedules</strong> – Work when you’re at your creative best.</li>
              <li>🎓 <strong>Learning & growth</strong> – Upskill with hands-on experiences and expert mentorship.</li>
              <li>🤝 <strong>Inclusive & friendly team</strong> – We rise together like our favorite sponge cakes.</li>
            </ul>

          </div>

          {/* Right Side */}
          <div className="flex-1 flex items-center gap-4">
            <img src={join} alt="Join Us" className="w-[220px] rounded-lg shadow-md" />
            <div className="space-y-3 text-left">
              <h3 className="text-2xl font-semibold text-[rgba(79,79,79,0.85)]">Want To Be A Part Of Us?</h3>
              <p className="text-[rgba(79,79,79,0.7)] text-base max-w-[260px]">
                Ready to bake your dreams with us? Reach out and let’s connect!
              </p>
              <a href="#footer">
                <button onClick={() => handleNavigation("/contact-us")} className="bg-[rgba(224,99,99,0.85)] text-white px-10 py-2 rounded hover:bg-[rgba(220,117,186,0.92)] transition ml-4">
                  Contact Us
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
