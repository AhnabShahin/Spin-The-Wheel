const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = {
  ...defaultConfig,
  entry: {
    index: './pre-build-ui-resources/core-init.jsx',
    user: './pre-build-ui-resources/show-init.jsx'
  },
  output: {
    path: __dirname + '/ui-resources',
    filename: '[name].js'
  }
};