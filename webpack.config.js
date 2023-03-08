const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const dev = {
    mode: "development",
    devtool: "source-map",
    entry: "./main",
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
                target: "https://www.kb.dk",
                changeOrigin: true,
            }
        }
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./index.html"
        }),
        new MiniCssExtractPlugin({filename: "css/style.css"}),
    ],
    module: {
        rules: [{
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
        },             {
            test: /\.(ttf|woff2|eot|woff)$/i,
            type: "asset/resource",
            generator: {
                filename: "fonts/[name][hash][ext]"
            }
        },
            {
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
                filename: "img/[name][ext]" // Cache busting with hash
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