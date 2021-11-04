// vue.config.js
const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@css': path.resolve(__dirname, 'src/assets/css'),
      },
    },
  },
  publicPath: '/reddit-april-fools/'
};
