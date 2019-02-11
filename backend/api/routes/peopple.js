import Router from 'koa-router';
import {
  get, create, remove, update,
} from '../controllers/people';

export default () => {
  const myRouter = new Router();

  /**
   * função reponsavel pelo o verbo GET.
   * @param {*} ctx requisição KOA
   */
  const getAll = async (ctx) => {
    try {
      const res = await get(ctx.params);
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
      const res = await create(ctx.request.body);
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
      const res = await update(ctx.request.body);
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
      const res = await remove(ctx.params);
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
