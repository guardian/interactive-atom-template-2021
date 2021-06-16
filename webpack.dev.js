var path = require("path");

const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { readdirSync } = require("fs");

const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const getFiles = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => !dirent.isDirectory())
    .map((dirent) => dirent.name.split(".")[0]);

const baseEntryPoint = "./src/atoms/";
const atoms = getDirectories(baseEntryPoint);
const harnesses = getFiles("./harness");

const harnessFiles = atoms.map((atom) =>
  harnesses.map((harness) => {
    return new HtmlWebpackPlugin({
      filename: `${atom}/${harness}.html`,
      template: path.resolve(__dirname, `./harness/${harness}.html`),
      inject: "body",
    });
  })
);

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {},
  plugins: harnessFiles.flat(),
});
