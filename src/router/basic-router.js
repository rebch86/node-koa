const KoaRouter = require('koa-router');
const fs = require('fs');
const basic = new KoaRouter();

basic.get('/', async (ctx, next) => {
    ctx.body = "<h1>First koa example !!</h1>";
});

basic.post('/login', async (ctx, next) => {
   console.log('call /login POST');
   console.log(ctx.request.body);
});

module.exports = basic;
