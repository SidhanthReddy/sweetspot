import React, { useEffect, useRef, useState } from 'react';
import ParallaxComponent from "./ParallaxComponent";
import parallaxImage1 from '../assets/parallaxImage6.webp';
import parallaxImage2 from '../assets/parallaxImage2.webp';
import parallaxImage3 from '../assets/parallaxImage3.webp';
import './components.css';
import Carousel  from "./Carousel";
import ReverseCarousel from "./ReverseCarousel";
import FlipCardCarousel from "./FlipCardCarousel";
import EquationAnimation from './EquationAnimation';
import VerticalProgressStepper from './VerticalProgressStepper';
import LazyStepper from './LazyStepper';
import { useNavigate } from 'react-router-dom';
function ParallaxCollection(){
  const navigate = useNavigate();
    return(
      <div className="space-y-8 bg-soft-pink">
      <ParallaxComponent
        content="Where Memories are layered with Sweetness."
        image={parallaxImage1}
      />
      <section>
        <div className="pt-12 pb-12">
          <h2 className="font-parastoo text-center text-3xl sm:text-5xl text-[rgba(79,79,79,0.66)]">
            A <span className="highlighted-text">Sweet Spot</span> of Love in Every Slice
          </h2>
          <blockquote className="font-parastoo text-center text-xl italic text-[rgba(55,55,55,0.7)] border-l-4 border-pink-300 pl-4 my-6">
            "At Sweet Spot, every bite is crafted with love, and every cake is made to surpass your sweetest dreams."
          </blockquote>
          <EquationAnimation></EquationAnimation>
        </div>
      </section>
      <ParallaxComponent
        content="Where Every Cake tells a Story"
        image={parallaxImage2}
      />
      <section>
        <div className="pt-12 pb-12">
          <h2 className="font-parastoo text-center text-4xl sm:text-5xl "  style={{ color: 'rgba(79, 79, 79, 0.66)' }}>Made with <span className="highlighted-text">love</span>, Made for <span className="highlighted-text">you</span></h2>
          <p className="font-parastoo text-center pb-8 text-2xl pt-2 mt-[20px]" style={{ color: 'rgba(79, 79, 79, 0.66)' }}>Here’s a taste of our sweetest creations </p>
          <Carousel></Carousel>
          <ReverseCarousel></ReverseCarousel>
        </div>
      </section>
      <ParallaxComponent
        content="You plan it. We Bake it."
        image={parallaxImage3}
      />
      <section>
        <div className="pt-12 pb-20">
          <h2 className="font-parastoo text-center text-3xl sm:text-5xl text-[rgba(79,79,79,0.66)]">
          Let <span className="highlighted-text">Your Dreams</span>  be deliciously <span className = "Love-highlighted-text">yours</span></h2>
          <blockquote className="font-parastoo text-center text-xl italic text-[rgba(55,55,55,0.7)] border-l-4 border-pink-300 pl-4 mt-6">
            “Every cake is as unique as the dream behind it — baked just for you.”
          </blockquote>
          <LazyStepper></LazyStepper>
          <FlipCardCarousel></FlipCardCarousel>
          <blockquote className="font-parastoo text-center text-xl sm:text-2xl lg:text-3xl text-[rgba(55,55,55,0.7)] border-l-4 border-pink-300 pl-2 sm:pl-4 mt-12 sm:mt-16 my-4 sm:my-6">
            <span className="inline-flex items-center gap-1 sm:gap-2 justify-center flex-wrap text-base sm:text-lg lg:text-xl">
              <button onClick={()=>{navigate('/customize'); window.scrollTo(0, 0);}} className="bg-[rgba(224,99,99,0.85)] font-medium py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg transition-colors duration-400 focus:outline-none focus:ring-2 focus:ring-[rgba(224,99,99,0.85)] focus:ring-offset-2 text-white text-sm sm:text-base lg:text-lg">
                Customize
              </button>
              your own cake with us today!
            </span>
          </blockquote>

        </div>
      </section>
    </div>
    );
}

export default ParallaxCollection;