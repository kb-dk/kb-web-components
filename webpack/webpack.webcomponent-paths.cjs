const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const path = require("path");

module.exports = {
  entry: "./src/main",
  output: {
      path: path.resolve("./dist/"),
      filename: "index.js",
      clean: true
  },
  plugins: [
    new HTMLWebpackPlugin({
        template: "./src/index.html"
    }),
],
}
