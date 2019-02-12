const Router = require('koa-router');
const toDraw = require('../controllers/draw');
const PeopleController = require('../controllers/people')();
const emailSend = require('../utils/utils');

module.exports = () => {
  const router = new Router();

  const draw = async (ctx) => {
    try {
      const peoples = await PeopleController.get();
      const mixedPeoples = toDraw(peoples);
      await PeopleController.putFriend(mixedPeoples);
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
