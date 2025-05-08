const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const tailwindcssPlugin = require("@tailwindcss/postcss");

module.exports = {
  plugins: [tailwindcssPlugin(tailwindcss), autoprefixer],
};
