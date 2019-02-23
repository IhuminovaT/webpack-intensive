/**
 * 1. webpack
 * 2. webpack dev server
 * 3. webpack hot middleware
 * 4. webpack config
 * 5. compiler
 * 6. init
 */

// Core
const webpack = require('webpack');
const getConfig = require('./config/webpack.config');
const chalk = require('chalk');
const devServer = require('webpack-dev-server');
const hot = require('webpack-hot-middleware');

const compiler = webpack(getConfig());

// Constants
const { HOST, PORT } = require('./constans');

const server = new devServer(compiler, {
  host:               HOST,
  port:               PORT,
  historyApiFallback: true,
  overlay:            true,
  quiet:              true,
  clientLogLevel:     'none',
  noInfo:             true,
  after:              (app) => {
    app.use(
      hot(compiler, {
        log: false,
      })
    )
  },
  open:               true,
});

server.listen(PORT, HOST, () => {
  console.log(
    `${chalk.greenBright('-> Server listening on')} ${chalk.blueBright(
      `http://${HOST}:${PORT}`,
    )}`
  );
});
