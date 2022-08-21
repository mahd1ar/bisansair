module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      'iransans': ['iransans'],
      'vazir': ['Vazir'],
      'yekan': ['BYekan'],
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        xl: '5rem',
        '2xl': '5rem',
      },
    },
    extend: {
      colors: {
        dark: '#191919',
        primery: {
          DEFAULT: '#EDE059',
          dark: '#5A623A'
        },
        secondary: {
          ligth: '#E3EBED',
          dark: '#697A80'
        }
      },
      // maxHeight: {
      //   '8/10': '80%',
      // },
      borderRadius: {
        circle: '50%'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      screens: {
        // 'md': '786px',
        // 'lg': '1280px',
        'xl': '1280px',
        '2xl': '1280px',
        // 'landscape': { 'raw': 'only screen and (max-width: 600px) and (orientation: landscape)' },
      },
    },
  },
  plugins: [],
}
