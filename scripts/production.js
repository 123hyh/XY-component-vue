const webpack = require('webpack');
const config = require('../config/webpack.production');
const app = webpack(config);
app.run((err, stats) => {
  console.log(stats);
});
