/**
 * 1. webpack
 * 2. webpack dev server
 * 3. webpack hot middleware
 * 4. webpack config
 * 5. compiler
 * 6. init
 */

// Core
import webpack from 'webpack';
import chalk from 'chalk';
import DevServer from 'webpack-dev-server';
import hot from 'webpack-hot-middleware';
import openBrowser from 'react-dev-utils/openBrowser';

import {
  choosePort,
  createCompiler,
  prepareProxy,
  prepareUrls,
} from 'react-dev-utils/WebpackDevServerUtils';

// Constants
import { HOST, PORT } from './constants';

// Config
import getConfig from './config/webpack.dev';

const compiler = webpack(getConfig());

choosePort(HOST, PORT)
  .then(port => {
    if (port == null) {
      // We have not found a port.
      return;
    }

    const server = new DevServer(compiler, {
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
          }),
        );
      },
    });

    server.listen(PORT, HOST, () => {
      const url = `http://${HOST}:${PORT}`;
      console.log(
        `${chalk.greenBright('→ Server listening on')} ${chalk.blueBright(
          url,
        )}`,
      );

      openBrowser(url);
    });
  })
  .catch(err => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });