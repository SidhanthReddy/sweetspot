export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Custom 24 column grid
        '24': 'repeat(24, minmax(0, 1fr))',
      },
      gridColumnStart: {
        '13': '13',
        '14': '14',
        '15': '15',
        '16': '16',
        '17': '17',
        '18': '18',
        '19': '19',
        '20': '20',
        '21': '21',
        '22': '22',
        '23': '23',
        '24': '24',
      },
      gridColumnEnd: {
        '13': '13',
        '14': '14',
        '15': '15',
        '16': '16',
        '17': '17',
        '18': '18',
        '19': '19',
        '20': '20',
        '21': '21',
        '22': '22',
        '23': '23',
        '24': '24',
        '25': '25',
      },
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
        "loop-scroll": "loop-scroll 200s linear infinite",
        "loop-scroll-reverse": "loop-scroll-reverse 200s linear infinite",
        "loop-scroll-flip": "loop-scroll-flip 120s linear infinite", 
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
        "loop-scroll-flip": {  // ← New keyframe for flip cards
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
      '.carousel-container:hover .animate-loop-scroll': {
        'animation-play-state': 'paused',
      },
      '.carousel-container:hover .animate-loop-scroll-reverse': {
        'animation-play-state': 'paused',
      },
      '.carousel-container:hover .animate-loop-scroll-flip': {  // ← Add this
        'animation-play-state': 'paused',
      },
      // Keep your existing utilities
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