const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const dev = {
    mode: "development",
    devtool: "source-map",
    entry: "./src/main",
    name: "dev",
    output: {
        path: path.join(__dirname, "dist/"),
        filename: "index.js",
        clean: true
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    devServer: {
        static: "./dist",
        historyApiFallback: true,
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, "src/npm_package.json"), to: "package.json" }
            ],
        }),
    ],
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: "/node_modules/",
            use: "ts-loader",
        },
            {
            test: "/^npm_package.json/",
            type: "asset/resource",
            generator: {
                filename: "package.json"
            }
        }
      ]
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