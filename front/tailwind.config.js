/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'deep-navy':      '#1A0A2E',
        'surface-purple': '#2D1B69',
        'kazakh-gold':    '#F5A623',
        'sky-blue':       '#00B4D8',
        'warm-orange':    '#FF6B35',
        'candy-pink':     '#FF4D9E',
        'mint-green':     '#00E5A0',
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '3rem',
      },
      animation: {
        'float':      'float 3s ease-in-out infinite',
        'float-slow': 'float 5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'bounce-in':  'bounceIn 0.5s cubic-bezier(0.36,0.07,0.19,0.97) forwards',
        'slide-up':   'slideUp 0.4s ease-out forwards',
        'shimmer':    'shimmer 2s linear infinite',
        'spin-slow':  'spin 8s linear infinite',
        'wiggle':     'wiggle 0.4s ease-in-out',
        'coin-fly':   'coinFly 0.8s ease-out forwards',
        'runner-bg':  'runnerScroll 8s linear infinite',
        'ping-slow':  'ping 2s cubic-bezier(0,0,0.2,1) infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 10px 2px rgba(245,166,35,0.3)' },
          '50%':     { boxShadow: '0 0 25px 8px rgba(245,166,35,0.7)' },
        },
        bounceIn: {
          '0%':   { transform: 'scale(0.3)', opacity: '0' },
          '60%':  { transform: 'scale(1.1)', opacity: '1' },
          '80%':  { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        slideUp: {
          from: { transform: 'translateY(30px)', opacity: '0' },
          to:   { transform: 'translateY(0)',    opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        wiggle: {
          '0%,100%': { transform: 'rotate(0deg)' },
          '25%':     { transform: 'rotate(-8deg)' },
          '75%':     { transform: 'rotate(8deg)' },
        },
        coinFly: {
          '0%':   { transform: 'translateY(0) scale(1)',    opacity: '1' },
          '100%': { transform: 'translateY(-80px) scale(0.5)', opacity: '0' },
        },
        runnerScroll: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
      },
      boxShadow: {
        'glow-gold':   '0 0 20px 4px rgba(245,166,35,0.5)',
        'glow-blue':   '0 0 20px 4px rgba(0,180,216,0.5)',
        'glow-orange': '0 0 20px 4px rgba(255,107,53,0.5)',
        'glow-pink':   '0 0 20px 4px rgba(255,77,158,0.5)',
        'card':        '0 8px 32px rgba(0,0,0,0.4)',
        'button':      '0 4px 16px rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [],
}
