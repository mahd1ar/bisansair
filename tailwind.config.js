module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      'iransans': ['iransans'],
      'vazir': ['Vazir'],
    },
    extend: {
      colors: {
        primery: '#EDE059',
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
      },
    },
  },
  plugins: [],
}
