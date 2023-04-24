const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./src/index.jsx"),
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
  },
  output: {
    path: path.resolve(__dirname, "./public"),
    publicPath: "/",
    filename: "bundle.js",
  },
  devServer: {
    historyApiFallback: true,
    port: 80,
    allowedHosts: "all",
    static: {
      directory: path.resolve(__dirname, "./public"),
    },
  },
};
