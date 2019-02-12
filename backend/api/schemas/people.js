const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;


const model = new Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  amigo: { type: String, required: false },
},
{
  timestamps: { createdAt: 'createdAt' },
});

module.exports = mongoose.model('People', model);
