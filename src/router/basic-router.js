const KoaRouter = require('koa-router');
const router = new KoaRouter();
const passport = require('koa-passport');
const fs = require('fs');

router.get('/', async (ctx, next) => {
    let n = 0;
    if (ctx.session) {
        n = ctx.session.views || 0;
        ctx.session.views = ++n;
    }
    ctx.body = `GET ${ctx.request.path} / SESSION views = ${n}`;
});

// router.post('login', async (ctx, next) => {
//     console.log(ctx.request.body);
// });

// router.post('login',
//     passport.authenticate('local', {
//         successRedirect: 'auth',
//         failureRedirect: 'index',
//         session: true
//     })
// );

router.post('login',
    passport.authenticate('local', {
        successRedirect: 'auth',
        failureRedirect: 'index',
        session: false
    })
);

// router.post('login', async (ctx, next) => {
//     passport.authenticate('local', {session : false}, async (err, user, info) => {
//         console.log(err);
//         console.log(user);
//         console.log(info);
//
//         if(user) {
//             ctx.redirect('auth');
//         } else {
//             ctx.redirect('index');
//         }
//
//     })(ctx, next);
// });

// router.get('auth', async (ctx) => {
//    if(ctx.isAuthenticated()){
//        ctx.response.type = 'html';
//        ctx.response.body = fs.createReadStream('./src/pages/auth_test.html');
//    } else {
//        console.log('not Auth..');
//        ctx.redirect('index');
//    }
// });

router.get('auth', async (ctx, next) => {
    console.log('JWT 인증함 해보자..');
});

module.exports = router;
