// Core
import { HotModuleReplacementPlugin } from 'webpack';
import merge from 'webpack-merge';

// Constants
import { SOURCE } from '../constants';

// Config
import getCommonConfig from './webpack.common';

export default () => {
  return merge(getCommonConfig(), {
    mode:     'development',
    devtool:  false,
    entry:    [ SOURCE, 'webpack-hot-middleware/client?reload=true&quiet=true' ],
    plugins:  [ new HotModuleReplacementPlugin() ],
  })
};
