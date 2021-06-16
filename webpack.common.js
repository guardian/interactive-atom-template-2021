const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
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

  plugins: entrypoints.map(
    (ep) =>
      new HtmlWebpackPlugin({
        filename: `${ep}/index.html`,
        templateContent: `<div class="interactive-atom__container">{{mainHtml}}</div>`,
        inject: "body",
      })
  ),
  output: {
    filename: "./[name]/main.js",
    path: path.resolve(__dirname, "./dist"),
    clean: true,
  },
};
