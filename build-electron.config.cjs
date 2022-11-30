/* globals module */
// const nodeExternals = require('webpack-node-externals');

module.exports = {
  mainEntry: 'src/index.js',
  preloadEntry: 'src/preload.js',
  outDir: 'build',
  mainTarget: 'electron21.2-main',
  preloadTarget: 'electron21.2-preload',
  externalsPresets: { node: true },
  // externals: [nodeExternals()],
  customConfig: {
    experiments: {
      topLevelAwait: true,
    },
    module: {
      noParse: /ipfs-util/,
    }
  },
};
