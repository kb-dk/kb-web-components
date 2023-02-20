const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const dev = {
    mode: "development",
    devtool: "source-map",
    entry: "./src/main",
    name: "dev",
    output: {
        path: path.join(__dirname, "dist/"),
        filename: "js/main.js",
        clean: true
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    devServer: {
        static: "./dist",
        historyApiFallback: true,
        proxy: {
            "/jsonapi": {
                target: "https://kbdk-testing.kb.dk",
                changeOrigin: true,
            }
        }
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./src/index.html"
        }),
    ],
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: "/node_modules/",
            use: "ts-loader",
        },
            {
            test: /\.html$/,
            exclude: "/node_modules/",
            use: "html-loader"
        },
            {
            test: /\.(jpg|png|gif|jpeg|svg)$/i,
            type: "asset",
            parser: {
              dataUrlCondition: {
                  maxSize: 20 * 1024, // images under 20kb get inline and the ones over that get copied
              }
            },
            generator: {
                filename: "img/[name][hash][ext]" // Cache busting with hash
            }
        }]
    }
}

const prod = {
    ...dev,
    name:'prod',
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: 'all'
            })
        ]
    }
}

module.exports = [dev, prod];