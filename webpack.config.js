const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  target: "web",
  entry: {
    bundle: "./src/index.tsx",
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".jpg", ".png", ".svg"],
  },
  devServer: {
    port: 8080,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js)$/,
        use: ["swc-loader"],
        include: path.resolve("src"),
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        include: path.resolve("src"),
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: true,
        minify: TerserPlugin.swcMinify,
        terserOptions: {},
      }),
    ],
    runtimeChunk: {
      name: "runtime",
    },
    removeAvailableModules: true,
  },
};
