var path = require("path");

const { mergeWithCustomize } = require("webpack-merge");
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

const atomHtmlTemplate = `<div class="interactive-atom__container">{{ mainHtml }}</div>`;

const htmlWebpackPlugins = atoms.map((atom) =>
  harnesses.map((harness) => {
    return new HtmlWebpackPlugin({
      filename:
        harness === "_index" ? `${harness}.html` : `${atom}/${harness}.html`,
      template: path.resolve(__dirname, `./harness/${harness}.html`),
      inject: "body",
      templateParameters: {
        html: atomHtmlTemplate,
        css: `${atom}/main.css`,
        js: `${atom}/main.js`,
        atoms,
      },
    });
  })
);

module.exports = mergeWithCustomize({
  customizeArray(a, b, key) {
    if (key === "plugins") {
      return [...b, ...a];
    }
    // Fall back to default merging
    return undefined;
  },
})(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    index: "_index.html",
  },
  plugins: htmlWebpackPlugins.flat(),
});
