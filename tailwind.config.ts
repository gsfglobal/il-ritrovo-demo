import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: '#221E19',
        ink: '#17140F',
        cream: '#F7F0E3',
        terracotta: '#A65F3E',
        cannonau: '#692D35',
        olive: '#626448',
        stone: '#D9C7AA',
        bronze: '#B08A55',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Manrope Variable"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { widest2: '0.32em' },
      maxWidth: { site: '1320px' },
    },
  },
  plugins: [],
};
export default config;
