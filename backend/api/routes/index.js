const Router = require('koa-router');
const people = require('./peopple');
const draw = require('./draw');


module.exports = () => {
  const myRouter = new Router();
  myRouter.use('/people', people());
  myRouter.use('/sortear', draw());

  return myRouter.routes();
};
