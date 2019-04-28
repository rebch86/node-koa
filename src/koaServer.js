const Koa = require("koa");
const app = new Koa();

app.use(async ctx => {
    ctx.body = "<h1>First koa example !!</h1>";
});

const port = 8080;
app.listen(port, function () {
    console.log('koa start..');
    console.log(`PORT : ${port}`);
});