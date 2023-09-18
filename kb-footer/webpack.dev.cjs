const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = {

    /*
    * DevServer setup is specific to each web-component, so we add it here
    * as well as other local dev configs specific to this web-component
    */

    plugins: [
        new webpack.DefinePlugin({
            BASEURL: JSON.stringify('https://kbdk-devel.kb.dk'),
            JSONAPIURL: JSON.stringify('/jsonapi/node/site/e065d5e7-a348-4384-9859-c17841d03019?resourceVersion=id%3A41807')
        })
    ],
    devServer: {
        static: "./dist",
        historyApiFallback: true
    }
};