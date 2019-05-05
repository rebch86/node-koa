const KoaRouter = require('koa-router');
const router = new KoaRouter();

router.get('/', async (ctx, next) => {
    ctx.body = 'GET ' + ctx.request.path;
});

router.post('login', async (ctx, next) => {
    console.log(ctx.request.body);
    ctx.body = 'POST ' + ctx.request.path;
});

module.exports = router;
