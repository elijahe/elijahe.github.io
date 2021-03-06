var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname + "/build/",
        filename: "bundle.js"
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin("styles.css")
    ]
};
