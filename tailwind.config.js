/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        accent: {
          cyan: '#00d4ff',
          purple: '#a855f7',
          blue: '#3b82f6',
        },
        dark: {
          950: '#050510',
          900: '#0a0a1a',
          800: '#0f0f24',
          700: '#15152e',
          600: '#1a1a38',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'twinkle': 'twinkle 2.5s ease-in-out infinite',
        'shoot': 'shoot 1.2s ease-out forwards',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(24px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        glowPulse: { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0.6 } },
        twinkle: { '0%, 100%': { opacity: 0.4 }, '50%': { opacity: 1 } },
        shoot: { '0%': { opacity: 0, transform: 'rotate(-35deg) translateX(0) translateY(0)' }, '10%': { opacity: 1 }, '90%': { opacity: 0.8 }, '100%': { opacity: 0, transform: 'rotate(-35deg) translateX(100vw) translateY(55vh)' } },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'linear-gradient(135deg, #0a0a1a 0%, #1a1a38 50%, #0f0f24 100%)',
      },
      boxShadow: {
        'glow-cyan': '0 0 40px rgba(0, 212, 255, 0.15)',
        'glow-purple': '0 0 40px rgba(168, 85, 247, 0.15)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
}
