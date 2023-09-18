const Dotenv = require('dotenv-webpack');

module.exports = {
        //specific production relevant config (local to the webcomponent) goes here
    plugins: [
        new Dotenv({ path: '.env.prod' }), 
    ],
};