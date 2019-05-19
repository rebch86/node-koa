const KoaRouter = require('koa-router');
const fs = require('fs');
const router = new KoaRouter();

router.get('/', async (ctx, next) => {
    console.log(ctx.query); //get queryString value
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./src/pages/index.html');
})
    .get('/register', async (ctx, next) => {
        ctx.response.type = 'html';
        ctx.response.body = fs.createReadStream('./src/pages/register.html');
    })
    .get('/:title', async (ctx, next) => {
        console.log(ctx.params); //get named route parameter
        ctx.response.type = 'html';
        ctx.response.body = fs.createReadStream('./src/pages/index.html');
    });

router.post('/regist/members', async(ctx, next) => {
    console.log('test 데이터 내놔');
    console.log(ctx.request.body);
});

module.exports = router;
