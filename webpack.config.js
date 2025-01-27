const defaultConfig = require("@wordpress/scripts/config/webpack.config");

module.exports = {
  ...defaultConfig,
  entry: {
    admin: "./src/scripts/admin/index.js",
    frontend: "./src/scripts/frontend/index.js",
  },
  module: {
    ...defaultConfig.module,
  },
  plugins: [
    ...defaultConfig.plugins,
  ],
  optimization: {
    ...defaultConfig.optimization,
    minimize: true,
    minimizer: [
      ...defaultConfig.optimization.minimizer || [],
      new (require('css-minimizer-webpack-plugin'))(),
    ],
  },
};
