const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');


module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.less'],
  },
  entry: {
    main: [ './app.js' ],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'js/[name].bundle.js'
  },
  plugins: [
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader?presets[]=es2015'
        ],
      },
      {
        test: /\.css$/,
        loaders: [
            'style-loader?convertToAbsoluteUrls',
          'css-loader?sourceMap=true&localIndentName=[name]__[local]--[hash:base64:5]',
        ],
      },
      {
        test: /\.less$/,
        loaders: [
          'style-loader?convertToAbsoluteUrls',
          'css-loader?sourceMap=true&localIndentName=[name]__[local]--[hash:base64:5]',
          'less-loader?sourceMap=true',
        ],
      },
      {
        test: /\.otf(.*)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
      {
        test: /\.woff(.*)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
      {
        test: /\.ttf(.*)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
      {
        test: /\.eot(.*)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
      {
        test: /\.jpg(.*)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
      {
        test: /\.png(.*)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
      {
        test: /\.svg(.*)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
    ],
  },
};
