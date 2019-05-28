const dotenv = require('dotenv');
dotenv.config();

const KoaStatic = require('koa-static');
const KoaMount = require('koa-mount');
const Koa = require("koa");
const logger = require('./logger/logger');
const router = require('./router/index');

const bodyParser = require('koa-bodyparser');
const dbConnection = require('./db/mysql-connection');

const app = new Koa();

// sessions
const session = require('koa-session');
const SESSION_CONFIG = {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 60000,
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
app.keys = ['phpbae'];
app.use(session(SESSION_CONFIG, app)); // Include the session middleware

// passport
require('./passport/auth');
const passport = require('koa-passport');
app.use(passport.initialize());
app.use(passport.session()); // passport 세션 연결

app.use(bodyParser()) //bodyParser는 라우터 코드보다 상단에 있어야함.
    .use(logger())
    .use(router.routes())
    .use(router.allowedMethods())
    .use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.header('Access-Control-Allow-Headers', 'content-type, jwt-token');
        next();
    });

app.use(KoaMount('/public', KoaStatic('./public')));

// app.use(async ctx => {
//     ctx.body = "<h1>First koa example !!</h1>";
// });

const port = 3030;
app.listen(port, async function () {
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


