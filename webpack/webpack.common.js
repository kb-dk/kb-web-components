
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports  = {
    resolve: {
        extensions: [".ts", "..."]
    },
    plugins: [
        new MiniCssExtractPlugin({filename: "css/style.css"}),
    ],
   
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: "/node_modules/",
            use: "ts-loader",
        },
        {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"]
        },
        {
            test: /\.scss$/,
            exclude: "/node_modules/",
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
        },
            {
            test: /\.html$/,
            exclude: "/node_modules/",
            use: "html-loader"
        },
        {
            test: /\.(ttf|woff2|eot|woff)$/i,
            type: "asset/resource",
            generator: {
                filename: "fonts/[name][contenthash][ext]"
            }
        },

            {
            test: /\.(jpg|png|gif|jpeg|svg)$/i,
            type: "asset",
            generator: {
                filename: "img/[name][contenthash][ext]" 
            }
        }]
    }
}


