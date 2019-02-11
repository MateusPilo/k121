/* eslint-disable import/no-extraneous-dependencies */
require('babel-register')({
  presets: ['env'],
});
require('babel-polyfill');
require('./server');
