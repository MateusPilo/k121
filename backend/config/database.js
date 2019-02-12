const mongoose = require('mongoose');
const config = require('./constants');


module.exports = () => {
  mongoose.Promise = global.Promise;

  const connect = async () => new Promise(async (resolve, reject) => {
    try {
      // eslint-disable-next-line prefer-destructuring
      const db = config.db;
      const url = `mongodb://${db.user}:${db.password}@${db.host}/${db.database}`;

      await mongoose.connect(url, { useNewUrlParser: true });
      console.log('Mongo connected');

      resolve('Mongo connected');
    } catch (error) {
      console.log(error);
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('Falha conexao mongo !');
    }
  });

  return { connect };
};
