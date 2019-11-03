const merge = require("webpack-merge")
const baseConfig = require("./webpack.base")

module.exports = merge(baseConfig, {
  devServer: {
    contentBase: "./dist"
  },
  devtool: "inline-source-map",
  mode: "development"
})
