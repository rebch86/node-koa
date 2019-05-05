const dotenv = require('dotenv');
dotenv.config();

const Koa = require("koa");
const logger = require('./logger/logger');
const router = require('./router/index');


const bodyParser = require('koa-bodyparser');
const dbConnection = require('./db/mysql-connection');

const KoaSession = require('koa-session');
const app = new Koa();

app.use(bodyParser()) //bodyParser는 라우터 코드보다 상단에 있어야함.
    .use(logger())
    .use(KoaSession(app))
    .use(router.routes())
    .use(router.allowedMethods());

const passport = require('passport');
const localStrategy = require('passport-local').Strategy; // local 로그인 전략
const jwtStrategy = require('passport-jwt').Strategy; // jwt 로그인 전략

// https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314
// usernameField / passwordField는 어떤 폼 필드로부터 아이디와 비밀번호를 전달받을 지 설정
// session -> 세션 저장여부
passport.use(new localStrategy({
        usernameField: 'userId',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (request, userId, password, done) {
    console.log('passport..');
    console.log(request);
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
    }
));

//done(p1, p2, p3)
// p1 : error / p2 : 성공 시, 리턴값 / p3 : 커스텀 error

passport.serializeUser((user, done) => {

}); //전략 성공시 호출

passport.deserializeUser((user, done) => {

}); // 전략 실패시 호출


// app.use(async ctx => {
//     ctx.body = "<h1>First koa example !!</h1>";
// });

// app.use(async ctx => {
//     // the parsed body will store in ctx.request.body
//     // if nothing was parsed, body will be an empty object {}
//     ctx.body = ctx.request.body;
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


