const path = require('path');

module.exports = {
  // ... your existing configuration ...
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
    },
  },
};
