const HTMLWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/main",
  output: {
      path: path.join(__dirname, "dist/"),
      filename: "js/[name].[contenthash].js",
      clean: true
  },
  plugins: [
    new HTMLWebpackPlugin({
        template: "./src/index.html"
    }),
],
}