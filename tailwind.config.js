/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#24666B",
        secondary: "#CBDEF4",
        accent: "#FC9442",
        neutral: "#C9C9C9",
        "base-100": "#ffff",
        info: "#3abff8",
        success: "#0FA958",
        warning: "#FFC700",
        error: "#CF3342",
        dark: "#242424",
        grayA: "#5B5B5B",
        grayB: "#8E8E8E",
        grayC: "#C9C9C9",
        grayD: "#F4F4F4",
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#24666B",
          secondary: "#CBDEF4",
          accent: "#FC9442",
          neutral: "#C9C9C9",
          "base-100": "#ffff",
          info: "#3abff8",
          success: "#0FA958",
          warning: "#FFC700",
          error: "#CF3342",
        },
      },
    ], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
};
