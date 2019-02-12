const Router = require('koa-router');
const controler = require('../controllers/people')();

module.exports = () => {
  const myRouter = new Router();

  /**
   * função reponsavel pelo o verbo GET.
   * @param {*} ctx requisição KOA
   */
  const getAll = async (ctx) => {
    try {
      const res = await controler.get(ctx.params);
      ctx.status = 200;
      ctx.body = res;
    } catch (error) {
      ctx.status = 500;
      ctx.message = error;
    }
  };


  /**
   * função reponsavel pelo o verbo POST.
   * @param {*} ctx requisição KOA
   */
  const post = async (ctx) => {
    try {
      const res = await controler.create(ctx.request.body);
      ctx.status = 200;
      ctx.body = res;
    } catch (error) {
      ctx.status = 500;
      ctx.message = error;
    }
  };

  /**
   * função reponsavel pelo o verbo PUT.
   * @param {*} ctx requisição KOA
   */
  const put = async (ctx) => {
    try {
      const res = await controler.update(ctx.request.body);
      ctx.status = 200;
      ctx.body = res;
    } catch (error) {
      ctx.status = 500;
      ctx.message = error;
    }
  };


  /**
   * função reponsavel pelo o verbo DELETE.
   * @param {*} ctx requisição KOA
   */
  const del = async (ctx) => {
    try {
      const res = await controler.remove(ctx.params);
      ctx.status = 200;
      ctx.body = res;
    } catch (error) {
      ctx.status = 500;
      ctx.message = error;
    }
  };

  myRouter.get('/', getAll);
  myRouter.get('/:id', getAll);
  myRouter.post('/', post);
  myRouter.put('/', put);
  myRouter.delete('/:id', del);

  return myRouter.routes();
};
