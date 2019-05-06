const dotenv = require('dotenv');
dotenv.config();

const Koa = require("koa");
const KoaSession = require('koa-session');
const logger = require('./logger/logger');
const router = require('./router/index');

const passport = require('./passport/index');

const bodyParser = require('koa-bodyparser');
const dbConnection = require('./db/mysql-connection');

const app = new Koa();

app.use(bodyParser()) //bodyParser는 라우터 코드보다 상단에 있어야함.
    .use(logger())
    .use(KoaSession(app))
    .use(router.routes())
    .use(router.allowedMethods());

app.use(passport.initialize());
app.use(passport.session());


// app.use(async ctx => {
//     ctx.body = "<h1>First koa example !!</h1>";
// });

const port = 3030;
app.listen(port, function () {
    console.log('koa start..');
    console.log(`PORT : ${port}`);
    console.log('env load ' +  process.env.WELCOME);

    dbConnection().then(connection => {
       connection.query('SELECT * FROM user', function (err, results, fileds) {
           if(results.length == 0) {
               console.log('no data..');
           } else {
               console.log(results);
               connection.close();
           }
       });
    });

});


