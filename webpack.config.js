const { join } = require('path');
const brotliPlugin = require('brotli-gzip-webpack-plugin');

module.exports = {
  entry: ['@babel/polyfill', join(__dirname, 'src', 'App.js')],
  output: {
    path: join(__dirname, 'dist'),
    filename: 'build.js',
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'stylus-loader',
        ],
      },
    ],
  },
  plugins: [
    new brotliPlugin({
      asset: '[file].br[query]',
      algorithm: 'brotli',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
      quality: process.env.NODE_ENV != 'production' ? 0 : 11,
    }),
    new brotliPlugin({
      asset: '[file].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
      quality: process.env.NODE_ENV != 'production' ? 0 : 11,
    }),
  ],
};
