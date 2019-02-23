// Core
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { resolve } = require('path');

/**
 * object
 * function
 * promise
 */
module.exports = (env) => {
  console.log('-> env', env);
  return {
    mode:    'none',
    devtool: false,
    output: {
      path: resolve(__dirname, './build'),
      filename: 'bundle.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './static/template.html',
        title:    'Learn webpack',
      }),
      new CleanWebpackPlugin([
        'dist',
        'build'
      ], {
        root: __dirname,
        verbose:  true,
      }),
    ],
  }
};
