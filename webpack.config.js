const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const glob = require("glob");

module.exports = {
  entry: {
    admin: "./src/scripts/admin/index.js",
    user: "./src/scripts/user/index.js",
    ...glob.sync("./src/styles/**/*.css").reduce((acc, file) => {
      const name = file.replace("./src/styles/", "").replace(".css", "");
      acc[name] = file;
      return acc;
    }, {}),
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "js/[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles/[name].min.css",
    }),
  ],
  optimization: {
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    "@wordpress/element": "wp.element",
  },
};