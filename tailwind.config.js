/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    extend: {
      backgroundColor: {
        // 'nav-bg': '#0b0d17'
        'nav-bg': '#151821'
        // 'nav-bg': '#1F293D'
      },
      height: {
        '55%': '55%',
        '45%': '45%'
      },
      fontFamily: {
        'bellefair': ['Bellefair', 'serif'],
        'barlow': ['Barlow Condensed', 'sans-serif'],
      },
      fontSize: {
        '28': '28px',
        '32': '32px',
        '56': '56px',
        '80': '80px',
        '100': '100px',
        '150': '150px',
      },
      backgroundImage: {
        'mobile-home-bg': `url(./assets/home/background-home-mobile.jpg)`,
        'tablet-home-bg': `url(./assets/home/background-home-tablet.jpg)`,
        'desktop-home-bg': `url(./assets/home/background-home-desktop.jpg)`,
        'mobile-destination-bg': 'url(./assets/destination/background-destination-mobile.jpg)',
        'tablet-destination-bg': 'url(./assets/destination/background-destination-tablet.jpg)',
        'desktop-destination-bg': 'url(./assets/destination/background-destination-desktop.jpg)',
        'white-gradient': 'linear-gradient(white, white)',
        'gray-gradient': 'linear-gradient(#6b7280, #6b7280)',
      },
      backgroundSize: {
        '0': '0% 2px',
        '2': '100% 2px',
        '3': '100% 3px',
      },

      letterSpacing: {
        '0.2': '0.2em'
      },
      textColor: {
        'body': '#D0D6F9',
      },
      transitionProperty: {
        // 'outline': 'outline-offset, outline-color, background-color',
        'bg-size': 'background-size',
      },
    },
  },
  plugins: [],
}
