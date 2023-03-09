const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const path = require("path");

module.exports = {
  entry: "./src/main",
  output: {
      path: path.resolve("./dist/"),
      filename: "js/[name].[contenthash].js",
      clean: true
  },
  plugins: [
    new HTMLWebpackPlugin({
        template: "./src/index.html"
    }),
    new CopyPlugin({
        patterns: [
            { from: path.resolve("./src/npm_package.json"), to: "package.json" }
        ],
    })
],
}
