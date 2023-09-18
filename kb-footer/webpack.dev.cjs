const Dotenv = require('dotenv-webpack');

module.exports = {
     /*
    * DevServer setup is specific to each web-component, so we add it here
    * as well as other local dev configs specific to this web-component
    */
    devServer: {
        static: "./dist",
        historyApiFallback: true
    },

    plugins: [
        new Dotenv({ path: '.env.dev' }), 
    ],
};