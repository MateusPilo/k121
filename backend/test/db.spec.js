/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable prefer-destructuring */
/* eslint-disable quote-props */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */
const chai = require('chai');
const config = require('config');
const sinon = require('sinon');
const sandboxed = require('sandboxed-module');

let sandbox = sinon.createSandbox();
let expect = chai.expect;
let mod;

let mongoose = {};


describe('******** DATABASE TEST **********', () => {
  beforeEach(() => {
    mongoose.connect = sandbox.stub();

    mod = sandboxed.require('../config/database', {
      requires: {
        'mongoose': mongoose,
        'config': config,
      },
    })();
  });

  it('Verifica se esta definido', () => {
    expect(mod).to.be.an('object');
  });

  afterEach(() => {
    sandbox.reset();
    sandbox.restore();
  });

  it('Conectou no banco', async () => {
    let result = await mod.connect();

    expect(result).to.be.equal('Mongo connected');
    expect(mongoose.connect.calledOnce).to.be.equal(true);
  });

  it('Falhou ao conectar no Banco', async () => {
    mongoose.connect.returns(Promise.reject({ message: 'test error' }));

    let result;
    try {
      result = await mod.connect();
    } catch (error) {
      result = error;
    }

    expect(result).to.be.equal('Falha conexao mongo !');
    expect(mongoose.connect.calledOnce).to.be.equal(true);
  });
});
