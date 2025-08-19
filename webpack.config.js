const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
  ...defaultConfig,
  entry: {
    index: path.resolve(__dirname, 'src/admin/index.jsx'),
    user: path.resolve(__dirname, 'src/frontend/index.jsx')
  },
  output: {
    path: path.resolve(__dirname, 'ui-resources'),
    filename: '[name].js',
    clean: true
  },
  resolve: {
    ...defaultConfig.resolve,
    alias: {
      ...defaultConfig.resolve?.alias,
      '@': path.resolve(__dirname, 'src'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@admin': path.resolve(__dirname, 'src/admin'),
      '@frontend': path.resolve(__dirname, 'src/frontend')
    }
  },
  module: {
    ...defaultConfig.module,
    rules: [
      ...defaultConfig.module.rules,
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  optimization: {
    ...defaultConfig.optimization,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        shared: {
          name: 'shared',
          minChunks: 2,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false
};