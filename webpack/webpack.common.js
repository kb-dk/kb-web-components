
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports  = {
    resolve: {
        extensions: [".ts", "..."]
    },
   
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
            generator: {
                filename: "img/[name][contenthash][ext]" 
            }
        }]
    }
}


