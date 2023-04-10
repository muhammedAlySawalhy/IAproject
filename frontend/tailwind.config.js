module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false, // disable the preflight plugin
  },
  layers: {
    base: {
      // define your base styles here
      // for example, typography and box sizing
      // ...
    },
    components: {
      // define your component styles here
      // ...
    },
    utilities: {
      // define your utility styles here
      // ...
    },
  },
};
