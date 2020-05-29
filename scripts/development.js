const config = require("../config/webpack.dev");
const express = require("express");
const webpack = require("webpack");
const path = require("path");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

const app = express();
const compiler = webpack(config);
// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(express.static(path.join(__dirname, "../example/")));
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: "/__build__/",
  })
);
app.use(webpackHotMiddleware(compiler));

// Serve the files on port 3499.
app.listen(3499, function() {
  console.log("Example app listening on port 3499!\n");
});
