const path = require("path");
const { cwd } = require("process");
const getPath = (...args) => path.resolve(cwd(), ...args);

module.exports = {
  entry: "./src/index.js",
  output: {
    path: getPath("dist"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
};
