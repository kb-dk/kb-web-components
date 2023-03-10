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
    new CopyPlugin({
        patterns: [
            { from: path.resolve("./README.md")},
            { from: path.resolve("./package.json"),
                transform(content) {
                    let json = JSON.parse(content.toString());
                    json["main"] = 'index.js';
                    json["module"] = 'index.js';
                    return Buffer.from(JSON.stringify(json, null, 2), "utf-8");
                },
            },
        ],
    })
],
}
