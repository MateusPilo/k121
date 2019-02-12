
const Koa = require('koa');
const Router = require('koa-router');
const body = require('koa-body');
const logger = require('koa-logger');
const helmet = require('koa-helmet');


const http = require('http');
const db = require('./config/database');
const myRoutes = require('./api/routes');
const config = require('./config/constants');

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

module.exports = app;
