/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const dotenv = require('dotenv');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const base = require('./webpack.base');

const env = dotenv.config({ path: path.resolve(__dirname, '../.env') }).parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);

  return prev;
}, {});

module.exports = merge(base, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 3000,
    proxy: {},
  },
  plugins: [new webpack.DefinePlugin(envKeys), new webpack.NoEmitOnErrorsPlugin()],
});
