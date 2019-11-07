const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const merge = require("webpack-merge")
const baseConfig = require("./webpack.base")

module.exports = merge(baseConfig, {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
})
