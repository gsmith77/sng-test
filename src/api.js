const Koa = require('koa');
const Router = require('@koa/router');
const serverless = require('serverless-http');
const cors = require('@koa/cors');
const bodyParser = require('koa-body');
const {createVote, getVotes} = require('./vote');

const app = new Koa();
const _ = new Router();

app.use(
  cors({
    origin: '*',
  })
);

app.use(
  bodyParser({
    multipart: true,
    urlencoded: true,
    formLimit: '5mb',
  })
);

_.get('/votes/:awardName', getVotes);
_.post('/vote', createVote);

app.use(_.routes());

const routes = serverless(app);
module.exports.handler = routes;
