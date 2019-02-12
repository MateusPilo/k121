/* eslint-disable import/no-extraneous-dependencies */
require('babel-register')({
  presets: ['env'],
});
require('babel-polyfill');
require('./server');

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};
