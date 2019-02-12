/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const People = require('../schemas/people');


module.exports = () => {
  /**
   * Esta funcao tem por objetivo buscar uma ou varias pessoas dependendo do parametro passado.
   * @param {id} params id da pessoa especifica para alteracao.
   */
  const get = async (params) => {
    let result = {};

    try {
      let dados;
      if (params && params.id) {
        dados = await People.findById(params.id);
      } else {
        dados = await People.find();
      }
      result = { succes: true, dados };
    } catch (error) {
      result = { succes: false, msg: error };
    }
    return result;
  };

  /**
   * Esá função tem por objetivo realizar a inserção de uma nova pessoa no schema People.
   * @param {body} body recebe o corpo de um objeto pessoa.
   */
  const create = async (body) => {
    let result = {};
    const data = body;

    try {
      const dados = await new People(data).save();
      result = { succes: true, dados };
    } catch (error) {
      result = { succes: false, msg: error };
    }
    return result;
  };

  /**
   * Esta função tem por objetivo atualizar as informacoes do schema People.
   * @param {body} body  recebe o corpo de um obejto pessoa atualizado.
   */
  const update = async (body) => {
    let result = {};

    try {
      let dados = await People.findById(body._id);

      dados.nome = body.nome;
      dados.email = body.email;

      dados = await dados.save();

      result = { succes: true, dados };
    } catch (error) {
      result = { succes: false, error };
    }
    return result;
  };

  /**
   * Está função tem por objetivo realizar a deleção de uma pessoa passada de acordo com o ID.
   * @param {id} params id de uma pessoa para remoção.
   */
  const remove = async (params) => {
    let result = {};

    try {
      const dados = await People.deleteOne({ _id: params.id });
      result = { succes: true, dados };
    } catch (error) {
      result = { succes: false, msg: error };
    }
    return result;
  };

  /**
   * Esta função tem por objetivo realizar a atualização do campo amigo no schema People,
   * para que seja preenchido com o amigo secreto.
   * @param {list} peoples lista de pessoas.
   */
  const putFriend = async ({ peoples }) => {
    let result = {};
    try {
      for (let index = 0; index < peoples.length; index++) {
        const people = peoples[index];
        const doc = await People.findById(people._id);
        doc.amigo = people.amigo;
        await doc.save();
      }
      result = { success: true, peoples };
    } catch (error) {
      result = { success: true, error };
    }
    return result;
  };

  return {
    get, create, update, remove, putFriend,
  };
};
