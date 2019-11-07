const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const merge = require("webpack-merge")
const baseConfig = require("./webpack.base")

module.exports = merge(baseConfig, {
  devServer: {
    contentBase: "./dist",
  },
  devtool: "inline-source-map",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hrm: true },
          },
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
})
