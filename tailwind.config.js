module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      'iransans': ['iransans'],
      'vazir': ['Vazir'],
    },
    // container: {
    //   backgroundColor: "red",
    //   maxWidth: {
    //     'xl': '1040px',
    //     '2xl': '1040px'
    //   }
    // },
    // container: {
    //   padding: '2rem',
    // },
    extend: {
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
