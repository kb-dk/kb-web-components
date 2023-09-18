
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [
        new TerserPlugin({
            extractComments: 'all'
        })
    ]
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
};



