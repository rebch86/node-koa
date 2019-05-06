const KoaRouter = require('koa-router');
const router = new KoaRouter();
const passport = require('koa-passport');
const fs = require('fs');

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

router.get('auth', async (ctx) => {
   if(ctx.isAuthenticated()){
       ctx.response.type = 'html';
       ctx.response.body = fs.createReadStream('./src/pages/auth_test.html');
   } else {
       console.log('not Auth..');
       ctx.redirect('index');
   }
});

module.exports = router;
