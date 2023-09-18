const webpack = require("webpack");

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            BASEURL: JSON.stringify('https://www.kb.dk'),
            JSONAPIURL: JSON.stringify('/jsonapi/node/site/e065d5e7-a348-4384-9859-c17841d03019')
        })
    ],
    //specific production relevant config (local to the webcomponent) goes here
};