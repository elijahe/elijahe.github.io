module.exports = {
    entry: "mocha!./tests/language_detector.test.js",
    output: {
        path: "tests",
        filename: "tests_built.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    devServer: {
      host: "localhost",
      port: "8081"
    }
};
