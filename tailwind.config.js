export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      fontFamily: {
        geist: ['"Geist Mono"', 'monospace'],
        inter: ['Inter', 'sans-serif'],
        jost: ['Jost', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
        ptsans: ['"PT Sans"', 'sans-serif'],
        parastoo: ['Parastoo', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
        winky: ['"Winky Sans"', 'sans-serif'],
      },
      animation: {
        "loop-scroll": "loop-scroll 50s linear infinite",
        "loop-scroll-reverse": "loop-scroll-reverse 50s linear infinite",
        'fade-in-1': 'fadeIn 0.6s ease forwards 0.3s',
        'fade-in-2': 'fadeIn 0.6s ease forwards 0.7s',
        'fade-in-3': 'fadeIn 0.6s ease forwards 1.1s',
        'fade-in-4': 'fadeIn 0.6s ease forwards 1.5s',
        'fade-in-5': 'fadeIn 0.6s ease forwards 1.9s',
        'fade-in-6': 'fadeIn 0.6s ease forwards 2.3s',
        'fade-in-7': 'fadeIn 0.6s ease forwards 2.7s',
      },
      keyframes: {
        "loop-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        "loop-scroll-reverse": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.animate-loop-scroll:hover': {
          'animation-play-state': 'paused',
        },
        '.animate-loop-scroll-reverse:hover': {
          'animation-play-state': 'paused',
        },
        // 3D Transform utilities for flip cards
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.transform-style-preserve-3d': {
          'transform-style': 'preserve-3d',
        },
        '.backface-hidden': {
          'backface-visibility': 'hidden',
        },
        '.rotate-y-180': {
          transform: 'rotateY(180deg)',
        },
      })
    }
  ],
}