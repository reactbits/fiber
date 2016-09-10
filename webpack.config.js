const makeWebpackConfig = require('react-devpack').makeWebpackConfig;

module.exports = makeWebpackConfig({
  entry: './demo/index',
  resolve: {
    alias: {
      'dev/raphael.core.js': './dev/raphael.core.js',
      'raphael.core': './raphael.core.js',
      'raphael.svg': './dev/raphael.svg.js',
      'raphael.vml': './dev/raphael.vml.js',
    },
  },
});
