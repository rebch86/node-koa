const KoaRouter = require('koa-router');
const router = new KoaRouter();
const passport = require('koa-passport');

router.get('/', async (ctx, next) => {
    ctx.body = 'GET ' + ctx.request.path;
});

// router.post('login', async (ctx, next) => {
//     console.log(ctx.request.body);
// });

router.post('login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: 'login'
    })
);

module.exports = router;
