const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { readdirSync } = require("fs");

const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const baseEntryPoint = "./src/atoms/";
const entrypoints = getDirectories(baseEntryPoint);

module.exports = merge(common, {
  mode: "production",
  plugins: entrypoints.map(
    (ep) =>
      new HtmlWebpackPlugin({
        filename: `${ep}/index.html`,
        templateContent: `<div class="interactive-atom__container">{{mainHtml}}</div>`,
        inject: "body",
      })
  ),
});
