//Require webpack specific tools
const { merge } = require('webpack-merge')

//Require base conf
const common = require("./webpack/webpack.common");

//Setup server environment definitions and get current environment
const envs = { development: "dev", production: "prod" };
const env = envs[process.env.NODE_ENV || "development"];

//Require conf that matches server environment
const envConfig = require(`./webpack/webpack.${env}.js`);

//Require webcomponent specific entry and index.html path
const globalPathConfig = require(`./webpack/webpack.global-paths`);

module.exports = merge(common, envConfig, globalPathConfig)
