import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: { 
    extend: {
      fontFamily: {
        'raleway': ['Raleway', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'sans': ['Raleway', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'display': ['Raleway', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Main CI Colors with enhanced palette
        primary: {
          25: '#f6fbf6',
          50: '#eaf5ea',
          100: '#d9edd9',
          200: '#c4e4c5',
          300: '#a5d6a7', // Light Green
          400: '#7cc68a',
          500: '#4caf50', // Main Green
          600: '#3c8f40',
          700: '#2f7033',
          800: '#225426',
          900: '#173b1b',
          950: '#0d1e0e',
        },
        // Enhanced secondary colors
        secondary: {
          25: '#fafbfa',
          50: '#f5f7f6',
          100: '#e3e8e3',
          200: '#c7d2c8',
          300: '#a4b9a6',
          400: '#7a9b7d',
          500: '#5a7f5e',
          600: '#46634a',
          700: '#384f3b',
          800: '#2f422f',
          900: '#263626',
          950: '#181d18',
        },
        // Accent colors for variety
        accent: {
          orange: '#ff6b35',
          blue: '#1e40af',
          purple: '#7c3aed',
          pink: '#ec4899',
          yellow: '#f59e0b',
        },
        // Semantic colors
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
      },
      animation: {
        // Existing animations (enhanced)
        'fade-in': 'fadeIn 0.8s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'fade-in-down': 'fadeInDown 0.8s ease-out',
        'fade-in-left': 'fadeInLeft 0.8s ease-out',
        'fade-in-right': 'fadeInRight 0.8s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'scale-out': 'scaleOut 0.3s ease-in',
        'bounce-soft': 'bounceSoft 0.8s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'float-delayed': 'float 4s ease-in-out infinite 2s',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scroll-reveal': 'scrollReveal 1s ease-out forwards',
        
        // New advanced animations
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'flip': 'flip 0.6s ease-in-out',
        'rubber-band': 'rubberBand 0.8s ease-out',
        'shake': 'shake 0.5s ease-in-out',
        'swing': 'swing 1s ease-in-out',
        'tada': 'tada 1s ease-in-out',
        'wobble': 'wobble 1s ease-in-out',
        'jello': 'jello 0.8s ease-in-out',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'breathing': 'breathing 3s ease-in-out infinite',
        'typewriter': 'typewriter 3s steps(50) infinite',
        'gradient-x': 'gradientX 15s ease infinite',
        'gradient-y': 'gradientY 15s ease infinite',
        'gradient-xy': 'gradientXY 15s ease infinite',
        'spin-slow': 'spin 3s linear infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'tilt': 'tilt 2s ease-in-out infinite',
        'reveal-text': 'revealText 2s ease-out forwards',
        'slide-reveal': 'slideReveal 1.2s ease-out forwards',
        'morph': 'morph 3s ease-in-out infinite',
        'particle': 'particle 20s linear infinite',
        'aurora': 'aurora 20s ease infinite',
        'meteor': 'meteor 3s ease-in-out infinite',
      },
      keyframes: {
        // Enhanced existing keyframes
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(50px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-50px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateX(0) scale(1)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateX(0) scale(1)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.8)', opacity: '0' },
        },
        bounceSoft: {
          '0%, 20%, 53%, 80%, 100%': { transform: 'translate3d(0,0,0)' },
          '40%, 43%': { transform: 'translate3d(0, -15px, 0)' },
          '70%': { transform: 'translate3d(0, -7px, 0)' },
          '90%': { transform: 'translate3d(0, -3px, 0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-10px) rotate(1deg)' },
          '66%': { transform: 'translateY(-5px) rotate(-1deg)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(76, 175, 80, 0.4)' },
          '100%': { boxShadow: '0 0 40px rgba(76, 175, 80, 0.8)' },
        },
        scrollReveal: {
          '0%': { opacity: '0', transform: 'translateY(100px) scale(0.8) rotateX(30deg)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1) rotateX(0deg)' },
        },
        
        // New advanced keyframes
        wiggle: {
          '0%, 7%': { transform: 'rotateZ(0)' },
          '15%': { transform: 'rotateZ(-15deg)' },
          '20%': { transform: 'rotateZ(10deg)' },
          '25%': { transform: 'rotateZ(-10deg)' },
          '30%': { transform: 'rotateZ(6deg)' },
          '35%': { transform: 'rotateZ(-4deg)' },
          '40%, 100%': { transform: 'rotateZ(0)' },
        },
        flip: {
          '0%': { transform: 'perspective(400px) rotateY(0)' },
          '40%': { transform: 'perspective(400px) translateZ(150px) rotateY(170deg)' },
          '50%': { transform: 'perspective(400px) translateZ(150px) rotateY(190deg) scale(1)' },
          '80%': { transform: 'perspective(400px) rotateY(360deg) scale(0.95)' },
          '100%': { transform: 'perspective(400px) scale(1)' },
        },
        rubberBand: {
          '0%': { transform: 'scale3d(1, 1, 1)' },
          '30%': { transform: 'scale3d(1.25, 0.75, 1)' },
          '40%': { transform: 'scale3d(0.75, 1.25, 1)' },
          '50%': { transform: 'scale3d(1.15, 0.85, 1)' },
          '65%': { transform: 'scale3d(0.95, 1.05, 1)' },
          '75%': { transform: 'scale3d(1.05, 0.95, 1)' },
          '100%': { transform: 'scale3d(1, 1, 1)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-10px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(10px)' },
        },
        swing: {
          '0%': { transform: 'rotate3d(0, 0, 1, 0deg)' },
          '10%': { transform: 'rotate3d(0, 0, 1, 10deg)' },
          '20%': { transform: 'rotate3d(0, 0, 1, -8deg)' },
          '30%': { transform: 'rotate3d(0, 0, 1, 6deg)' },
          '40%': { transform: 'rotate3d(0, 0, 1, -4deg)' },
          '50%': { transform: 'rotate3d(0, 0, 1, 2deg)' },
          '60%': { transform: 'rotate3d(0, 0, 1, 0deg)' },
          '100%': { transform: 'rotate3d(0, 0, 1, 0deg)' },
        },
        tada: {
          '0%': { transform: 'scale3d(1, 1, 1)' },
          '10%, 20%': { transform: 'scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)' },
          '30%, 50%, 70%, 90%': { transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)' },
          '40%, 60%, 80%': { transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)' },
          '100%': { transform: 'scale3d(1, 1, 1)' },
        },
        wobble: {
          '0%': { transform: 'translateX(0%)' },
          '15%': { transform: 'translateX(-25%) rotate3d(0, 0, 1, -5deg)' },
          '30%': { transform: 'translateX(20%) rotate3d(0, 0, 1, 3deg)' },
          '45%': { transform: 'translateX(-15%) rotate3d(0, 0, 1, -3deg)' },
          '60%': { transform: 'translateX(10%) rotate3d(0, 0, 1, 2deg)' },
          '75%': { transform: 'translateX(-5%) rotate3d(0, 0, 1, -1deg)' },
          '100%': { transform: 'translateX(0%)' },
        },
        jello: {
          '0%, 11.1%, 100%': { transform: 'none' },
          '22.2%': { transform: 'skewX(-12.5deg) skewY(-12.5deg)' },
          '33.3%': { transform: 'skewX(6.25deg) skewY(6.25deg)' },
          '44.4%': { transform: 'skewX(-3.125deg) skewY(-3.125deg)' },
          '55.5%': { transform: 'skewX(1.5625deg) skewY(1.5625deg)' },
          '66.6%': { transform: 'skewX(-0.78125deg) skewY(-0.78125deg)' },
          '77.7%': { transform: 'skewX(0.390625deg) skewY(0.390625deg)' },
          '88.8%': { transform: 'skewX(-0.1953125deg) skewY(-0.1953125deg)' },
        },
        heartbeat: {
          '0%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.3)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.3)' },
          '70%': { transform: 'scale(1)' },
        },
        breathing: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
        typewriter: {
          '0%': { width: '0ch' },
          '50%': { width: '50ch' },
          '100%': { width: '0ch' },
        },
        gradientX: {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
        },
        gradientY: {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'center top' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'center bottom' },
        },
        gradientXY: {
          '0%, 100%': { 'background-size': '400% 400%', 'background-position': 'left center' },
          '25%': { 'background-size': '400% 400%', 'background-position': 'right center' },
          '50%': { 'background-size': '400% 400%', 'background-position': 'center bottom' },
          '75%': { 'background-size': '400% 400%', 'background-position': 'center top' },
        },
        tilt: {
          '0%, 50%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(1deg)' },
          '75%': { transform: 'rotate(-1deg)' },
        },
        revealText: {
          '0%': { 'clip-path': 'polygon(0 0, 0 0, 0 100%, 0% 100%)' },
          '100%': { 'clip-path': 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
        },
        slideReveal: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '50%': { transform: 'translateX(-50%)', opacity: '0.5' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        morph: {
          '0%, 100%': { 'border-radius': '60% 40% 30% 70%/60% 30% 70% 40%' },
          '50%': { 'border-radius': '30% 60% 70% 40%/50% 60% 30% 60%' },
        },
        particle: {
          '0%': { transform: 'translateY(0) translateX(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(-100vh) translateX(100px) scale(0)', opacity: '0' },
        },
        aurora: {
          '0%, 100%': { 
            'background-position': '0% 50%',
            'background-size': '300% 300%',
          },
          '50%': { 
            'background-position': '100% 50%',
            'background-size': '300% 300%',
          },
        },
        meteor: {
          '0%': { transform: 'rotate(215deg) translateX(0)', opacity: '1' },
          '70%': { opacity: '1' },
          '100%': { transform: 'rotate(215deg) translateX(-500px)', opacity: '0' },
        },
      },
      transitionProperty: {
        'all-smooth': 'all',
        'colors-transform': 'color, background-color, border-color, text-decoration-color, fill, stroke, transform',
        'colors-shadow': 'color, background-color, border-color, text-decoration-color, fill, stroke, box-shadow',
        'size': 'width, height',
        'spacing': 'margin, padding',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '900': '900ms',
        '1200': '1200ms',
      },
      transitionTimingFunction: {
        'ease-smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'ease-bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'ease-elastic': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
        'ease-back': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(76, 175, 80, 0.4)',
        'glow-lg': '0 0 40px rgba(76, 175, 80, 0.5)',
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)',
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      gradientColorStops: {
        'primary-gradient': {
          '0%': '#4caf50',
          '100%': '#2e7d32',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
