const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = {
  ...defaultConfig,
  entry: {
    index: './src/main.jsx',
    user: './src/theme.jsx'
  },
  output: {
    path: __dirname + '/build',
    filename: '[name].js'
  }
};