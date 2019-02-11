
import Koa from 'koa';
import Router from 'koa-router';
import body from 'koa-body';
import logger from 'koa-logger';
import helmet from 'koa-helmet';


import * as http from 'http';
import db from './config/database';
import myRoutes from './api/routes';
import * as config from './config/constants';

const app = new Koa();
const myRouter = new Router();


http.createServer(app.callback())
  .listen(config.port, () => {
    console.log(`Server running in port:${config.port}`);
  });

myRouter.use('/api', myRoutes());
app.use((ctx, next) => {
  try {
    console.log('iniciou cors');
    const methods = ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'OPTIONS'];
    const allowedHeaders = ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'];
    ctx.vary('Origin');

    ctx.set('Access-Control-Allow-Methods', methods);
    ctx.set('Access-Control-Allow-Headers', allowedHeaders);
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Credentials', 'true');


    return next();
  } catch (err) {
    throw err;
  }
});

app.use(body({ multipart: true, jsonLimit: '10mb' }));
app.use(helmet());
app.use(logger());
app.use(myRouter.routes()).use(myRouter.allowedMethods());


db().connect();

export default app;
