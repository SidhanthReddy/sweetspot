export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      backgroundImage: {
        'soft-pink': 'linear-gradient(to bottom right, #fff5f6, #fff1f2, #fffafa)',
        // rose-50, pink-50, orange-50
        'soft-blue': 'linear-gradient(to bottom right, #f5f7fa, #f5f7fa)', // sky-50, blue-50, indigo-50
      },
      gridTemplateColumns: {
        // Custom 24 column grid
        24: "repeat(24, minmax(0, 1fr))",
      },
      gridColumnStart: {
        13: "13",
        14: "14",
        15: "15",
        16: "16",
        17: "17",
        18: "18",
        19: "19",
        20: "20",
        21: "21",
        22: "22",
        23: "23",
        24: "24",
      },
      gridColumnEnd: {
        13: "13",
        14: "14",
        15: "15",
        16: "16",
        17: "17",
        18: "18",
        19: "19",
        20: "20",
        21: "21",
        22: "22",
        23: "23",
        24: "24",
        25: "25",
      },
      fontFamily: {
        geist: ['"Geist Mono"', "monospace"],
        inter: ["Inter", "sans-serif"],
        jost: ["Jost", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
        ptsans: ['"PT Sans"', "sans-serif"],
        parastoo: ["Parastoo", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
        winky: ['"Winky Sans"', "sans-serif"],
      },
      animation: {
        "loop-scroll": "loop-scroll 1000s linear infinite",
        "loop-scroll-reverse": "loop-scroll-reverse 1000s linear infinite",
        
        // Tablet
        "loop-scroll-md": "loop-scroll 800s linear infinite",
        "loop-scroll-reverse-md": "loop-scroll-reverse 800s linear infinite",
        
        // Laptop/Desktop - your original perfect speed
        "loop-scroll-lg": "loop-scroll 1200s linear infinite",
        "loop-scroll-reverse-lg": "loop-scroll-reverse 1200s linear infinite",
        // Flip Cards - New animation for flip cards
        "loop-scroll-flip": "loop-scroll-flip 120s linear infinite",
        "fade-in-1": "fadeIn 0.6s ease forwards 0.3s",
        "fade-in-2": "fadeIn 0.6s ease forwards 0.7s",
        "fade-in-3": "fadeIn 0.6s ease forwards 1.1s",
        "fade-in-4": "fadeIn 0.6s ease forwards 1.5s",
        "fade-in-5": "fadeIn 0.6s ease forwards 1.9s",
        "fade-in-6": "fadeIn 0.6s ease forwards 2.3s",
        "fade-in-7": "fadeIn 0.6s ease forwards 2.7s",
        "scroll-up-slow": "scroll-up-slow 80s linear infinite",
        "scroll-down-fast": "scroll-down-fast 30s linear infinite",
        cartDance: "cartDance 1.8s ease-in-out infinite",
        slideLine: "slideLine 2s ease-in-out infinite",
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'fade-in-left': 'fadeInLeft 0.8s ease-out',
        'fade-in-right': 'fadeInRight 0.8s ease-out',
        'scale-up': 'scaleUp 0.5s ease-out',
        "gradient-x": "gradientX 1.8s ease-in-out infinite",
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
        "loop-scroll-flip": {
          // ← New keyframe for flip cards
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "scroll-up-slow": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
        "scroll-down-fast": {
          "0%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(-50%)" },
        },
        cartDance: {
          "0%, 100%": { transform: "rotate(0deg) translateY(0)" },
          "25%": { transform: "rotate(-10deg) translateY(-4px)" },
          "50%": { transform: "rotate(10deg) translateY(-8px)" },
          "75%": { transform: "rotate(-10deg) translateY(-4px)" },
        },
        slideLine: {
          "0%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        gradientX: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
                fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".carousel-container:hover .animate-loop-scroll": {
          "animation-play-state": "paused",
        },
        ".carousel-container:hover .animate-loop-scroll-reverse": {
          "animation-play-state": "paused",
        },
        ".carousel-container:hover .animate-loop-scroll-flip": {
          // ← Add this
          "animation-play-state": "paused",
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

