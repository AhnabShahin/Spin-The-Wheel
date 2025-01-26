const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  ...defaultConfig,
  entry: {
    admin: "./src/scripts/admin/index.js",
    frontend: "./src/scripts/frontend/index.js",
  },
  module: {
    ...defaultConfig.module,
    rules: [
      ...defaultConfig.module.rules,
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    ...defaultConfig.plugins,
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
};
