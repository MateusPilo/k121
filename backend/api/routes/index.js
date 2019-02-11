import Router from 'koa-router';
import people from './peopple';
import draw from './draw';


export default () => {
  const myRouter = new Router();
  myRouter.use('/people', people());
  myRouter.use('/sortear', draw());

  return myRouter.routes();
};
