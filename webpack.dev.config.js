const path = require('path');
const webpack = require('webpack');

const webpackBaseConfig = require('./webpack.base.config.js');


module.exports = Object.assign({}, webpackBaseConfig, {
  devtool: 'inline-source-map',
  entry: Object.keys(webpackBaseConfig.entry).reduce((result, k) => {
    result[k] = [
      'webpack-hot-middleware/client?reload=true',
      ...webpackBaseConfig.entry[k],
    ];
    return result;
  }, {}),
  output: Object.assign({}, webpackBaseConfig.output, {
    publicPath: '/bundle/',
  }),
  plugins: [
    ...webpackBaseConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('development') }
    }),
  ],
});
