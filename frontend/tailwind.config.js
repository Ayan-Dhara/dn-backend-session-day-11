module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'logo': "url('/images/icon.svg')",
        'user': "url('/images/user.svg')"
      },
      width: {
        'popup': '666.66px'
      }
    },
    placeholder: {

    },
    backgroundColor: ((theme) => ({
      ...theme('colors'),
      'primary': '#00B2FF',
      'secondary': '#ffed4a',
      'popup': '#00000044'
    })),
    screens: {
      'xl': {'min': '800px'},
      'lg': {'max': '600px'},
      'md': {'max': '500px'},
      'sm': {'max': '400px'}
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
