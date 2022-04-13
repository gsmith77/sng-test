import Koa from 'koa';
import Router from '@koa/router';
import serverless from 'serverless-http';
import cors from '@koa/cors';
import bodyParser from 'koa-body';
import * as VoteController from './controllers/vote';

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

_.get('/votes/:awardName', VoteController.getVotes);
_.post('/vote', VoteController.createVote);

app.use(_.routes());
module.exports.handler = serverless(app);
