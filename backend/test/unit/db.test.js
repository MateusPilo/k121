/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable prefer-destructuring */

const chai = require('chai');


const sandboxed = require('sandboxed-module');

const _sandbox = require('sinon');
const config = require('config');

const sandbox = _sandbox.createSandbox();
const expect = chai.expect;
let mod;
const mongooseTest = {};

describe('Bd Teste', () => {
  beforeEach(() => {
    mongooseTest.connect = sandbox.stub();
    mod = sandboxed.require('../../config/database.js', {
      requires: {
        'mongoose': mongooseTest,
        'config': config,
      },
    });
  });

  afterEach(() => {
    sandbox.reset();
    sandbox.restore();
  });

  it('verifica se module nao esta undefined', () => {
    console.log(mod);
    expect(mod).to.be.an('object');
  });

  it('verifica se as functions foram exportadas corretamente', () => {
    expect(mod.connect).to.be.an('function');
  });
});
