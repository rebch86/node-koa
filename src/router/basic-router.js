const KoaRouter = require('koa-router');
const router = new KoaRouter();

router.get('/', async (ctx, next) => {
    ctx.body = 'GET ' + ctx.request.path;
});

router.post('login', async (ctx, next) => {
    console.log('call /login POST');
    // console.log(ctx.request.body);
    ctx.body = 'GET ' + ctx.request.path;
});

router.get(':title', async (ctx, next) => {
    console.log(ctx.params); //get named route parameter
    ctx.body = 'GET ' + ctx.request.path;
});

module.exports = router;
