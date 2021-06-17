const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

const { readdirSync } = require("fs");

const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const baseEntryPoint = "./src/atoms/";
const entrypoints = getDirectories(baseEntryPoint);

module.exports = {
  entry: Object.fromEntries(
    entrypoints.map((ep) => [ep, `${baseEntryPoint}${ep}/client/js/main.js`])
  ),
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules|dist)/,
        use: ["babel-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js"],
  },
  plugins: [new WebpackManifestPlugin()],
  output: {
    filename: "./[name]/main.js",
    path: path.resolve(__dirname, "./dist"),
    clean: true,
  },
};
