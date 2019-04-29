const Koa = require("koa");
const app = new Koa();

const passport = require('passport');
const localStrategy = require('passport-local').Strategy; // local 로그인 전략
const jwtStrategy = require('passport-jwt').Strategy; // jwt 로그인 전략

// https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314
// usernameField / passwordField는 어떤 폼 필드로부터 아이디와 비밀번호를 전달받을 지 설정
// session -> 세션 저장여부
passport.use(new localStrategy({
    usernameField : 'userId',
    passwordField : 'password'
},
    function (userId, password, cb) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
    }
));


app.use(async ctx => {
    ctx.body = "<h1>First koa example !!</h1>";
});

const port = 3030;
app.listen(port, function () {
    console.log('koa start..');
    console.log(`PORT : ${port}`);
});
