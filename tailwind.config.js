module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      'iransans': ['iransans'],
      'vazir': ['Vazir'],
    },
    extend: {
      colors: {
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
        'xl': '1040px',
        '2xl': '1040px',
        // 'landscape': { 'raw': 'only screen and (min-height : 321px)' },
      },
    },
  },
  plugins: [],
}
