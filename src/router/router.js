const KoaRouter = require('koa-router');
const fs = require('fs');
const router = new KoaRouter();

router.get('/', async (ctx, next) => {
    ctx.body = "<h1>First koa example !!</h1>";
});

router.get('/index', async (ctx, next) => {
    console.log('call /index GET');
    console.log(ctx.query); //get queryString value
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./src/pages/index.html');
});

router.get('/index/:title', async (ctx, next) => {
    console.log('call /index GET');
    console.log(ctx.params); //get named route parameter
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./src/pages/index.html');
});



router.post('/login', async (ctx, next) => {
   console.log('call /login POST');
   console.log(ctx.request.body);
});

module.exports = router;