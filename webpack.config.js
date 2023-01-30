const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        include: path.resolve(__dirname, "src"),
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          outputPath: "images",
        },
      },
      {
        test: /\.mp4$/,
        loader: "file-loader",
        options: {
          outputPath: "videos",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".json", ".jsx"],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    hot: true,
    liveReload: true,
    compress: true,
    open: true,
    port: 3000,
  },
};
