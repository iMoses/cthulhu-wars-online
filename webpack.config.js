/* eslint-disable @typescript-eslint/no-var-requires */
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('node:path');
const webpack = require('webpack');

const isDevMode = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevMode ? 'development' : 'production',
  context: resolvePath('src'),
  devtool: 'source-map',
  entry: {
    main: resolvePath('src/main.jsx'),
  },
  output: {
    asyncChunks: true,
    clean: true,
    filename: isDevMode ? '[name].js' : '[name].[contenthash].js',
    path: resolvePath('dist'),
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: '@linaria/webpack5-loader',
            options: { sourceMap: isDevMode },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: { sourceMap: isDevMode },
          },
        ],
      },
    ],
  },

  resolve: {
    alias: {
      '@src': resolvePath('src'),
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },

  plugins: [
    new CopyWebpackPlugin({ patterns: [resolvePath('static')] }),
    new HtmlWebpackPlugin({
      template: resolvePath('src/assets/template.html'),
    }),
    new webpack.ProvidePlugin({ React: 'react' }),
    new MiniCssExtractPlugin({
      filename: isDevMode ? '[name].css' : '[name].[contenthash].css',
    }),
  ],

  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },

  devServer: {
    port: 3000,
    magicHtml: false,
    historyApiFallback: true,
  },
};

function resolvePath(...paths) {
  return path.resolve(__dirname, ...paths);
}
