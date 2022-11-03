import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'node:path';
import url from 'node:url';
import webpack from 'webpack';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDevMode = process.env.NODE_ENV !== 'production';

export default {
  mode: isDevMode ? 'development' : 'production',
  context: resolvePath('src'),
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
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: '@linaria/webpack-loader',
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
    extensions: ['.js', '.jsx', '.json'],
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
  },
};

function resolvePath(...paths) {
  return path.resolve(__dirname, ...paths);
}
