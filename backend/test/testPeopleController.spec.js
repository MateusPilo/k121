/* eslint-disable no-undef */
/* eslint-disable prefer-destructuring */
const chai = require('chai');
const sinon = require('sinon');
const sandboxed = require('sandboxed-module');

const sand = sinon.sandbox.create();
const expect = chai.expect;
let mod;

const people = {};
const document = {};

describe('******** PESSOA CONTROLLER **********', () => {
  beforeEach(() => {
    people.findById = sand.stub().returns({ nome: 'Mateus' });
    people.find = sand.stub().returns([{ nome: 'Mateus' }, { nome: 'teste' }]);
    people.deleteOne = sand.stub().returns('ok');
    document.save = sand.stub().returns('ok');

    mod = sandboxed.require('../api/controllers/people', {
      requires: {
        '../schemas/people': people,
      },
    })();
  });

  afterEach(() => {
    sand.reset();
    sand.restore();
  });

  it('Verifica se objeto pessoa nao esta undefined', () => {
    expect(mod).to.be.an('object');
  });

  it('Verifica se as funcoes foram exportadas', () => {
    expect(mod.get).to.be.an('function');
    expect(mod.create).to.be.an('function');
    expect(mod.update).to.be.an('function');
    expect(mod.remove).to.be.an('function');
    expect(mod.putFriend).to.be.an('function');
  });

  describe('******** GET **********', () => {
    it('busca todas as pessoas', async () => {
      const result = await mod.get();
      const array = [{ nome: 'Mateus' }, { nome: 'teste' }];

      expect(result.dados).to.be.an('array');
      expect(result.dados.length).to.be.equal(2);
      expect(result.dados).to.deep.equal(array);

      expect(people.find.calledOnce).to.be.equal(true);
      expect(people.findById.notCalled).to.be.equal(true);
    });

    it('busca 1 pessoa com o id especifico', async () => {
      const result = await mod.get({ id: 'test' });

      const object = { nome: 'Mateus' };

      expect(result.succes).to.be.an('boolean');
      expect(result.succes).to.be.equal(true);
      expect(result.dados).to.be.an('object');
      expect(result.dados).to.deep.equal(object);

      expect(people.find.notCalled).to.be.equal(true);
      expect(people.findById.calledOnce).to.be.equal(true);
    });
  });

  describe('****** UPDATE ********', () => {
    it('atualiza uma Pessoa', async () => {
      people.findById.returns({ save: document.save });

      const result = await mod.update({ _id: '45', nome: 'mateus', email: 'mateus-pilo@hotmail.com' });

      expect(result.succes).to.be.an('boolean');
      expect(result.succes).to.be.equal(true);
      expect(result.dados).to.be.equal('ok');

      expect(people.findById.calledOnce).to.be.equal(true);
      expect(people.findById.calledWith('45')).to.be.equal(true);
    });
  });

  describe('******** REMOVE **********', () => {
    it('remove uma Pessoa', async () => {
      people.findById.returns({ save: document.save });

      const result = await mod.remove({ id: 'test' });


      expect(result.succes).to.be.an('boolean');
      expect(result.succes).to.be.equal(true);
      expect(result.dados).to.be.an('string');
      expect(result.dados).to.be.equal('ok');

      expect(people.deleteOne.calledOnce).to.be.equal(true);
      expect(people.deleteOne.calledWith({ _id: 'test' })).to.be.equal(true);
    });
  });

  describe('******** PUT FRIEND **********', () => {
    it('Atualiza amigo no banco', async () => {
      people.findById.returns({ save: document.save });

      const peoples = [{
        _id: '45',
        nome: 'mateus',
        email: 'mateus-pilo@hotmail.com',
        amigo: 'teste',
      }];

      const result = await mod.putFriend({ peoples });

      expect(result.success).to.be.an('boolean');
      expect(result.success).to.be.equal(true);
      expect(result.peoples).to.be.an('array');
      expect(result.peoples).to.be.equal(peoples);

      expect(people.findById.calledOnce).to.be.equal(true);
    });
  });
});
