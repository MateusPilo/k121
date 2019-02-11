import Router from 'koa-router';
import { toDraw } from '../controllers/draw';
import { get, putFriend } from '../controllers/people';
import { emailSend } from '../utils/utils';

export default () => {
  const router = new Router();

  const draw = async (ctx) => {
    try {
      const peoples = await get();
      const mixedPeoples = toDraw(peoples);
      await putFriend(mixedPeoples);
      emailSend(mixedPeoples);

      ctx.status = 200;
      ctx.body = mixedPeoples;
    } catch (error) {
      ctx.status = 500;
      ctx.message = error;
    }
  };

  router.post('/', draw);

  return router.routes();
};
