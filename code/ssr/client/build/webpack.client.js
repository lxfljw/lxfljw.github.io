const path = require("path");
const merge = require("webpack-merge").default;
const baseConfig = require("./webpack.base.js");

/**
 * @type {import('webpack').Configuration}
 */
const clientConfig = {
  mode: "development",
  entry: path.resolve(__dirname, "../index.js"),
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "../../public"),
  },
};

module.exports = merge(baseConfig, clientConfig);
