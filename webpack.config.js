var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var HOST = process.env.HOST || 'localhost';
var PORT = process.env.PORT || 8123;

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://' + HOST + ':' + PORT,
    'webpack/hot/only-dev-server',
    './src/index.js',
  ],

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/static/'
  },

  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Custom template',
      template: './index.ejs',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],

  devServer: {
    host: HOST,
    port: PORT,
    historyApiFallback: true,
    hot: true,
  },
};
