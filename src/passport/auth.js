const passport = require('koa-passport');
const localStrategy = require('passport-local').Strategy; // local 로그인 전략
const jwtStrategy = require('passport-jwt').Strategy; // jwt 로그인 전략

// https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314
// usernameField / passwordField는 어떤 폼 필드로부터 아이디와 비밀번호를 전달받을 지 설정
// session -> 세션 저장여부
passport.use(new localStrategy({
        usernameField: 'userId',
        passwordField: 'password',
        passReqToCallback: true,
    },
    function (request, userId, password, done) {
        console.log('passport..');
        // console.log(request);
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
    }
));

//done(p1, p2, p3)
// p1 : error / p2 : 성공 시, 리턴값 / p3 : 커스텀 error

passport.serializeUser((user, done) => {

}); //전략 성공시 호출

passport.deserializeUser((user, done) => {

}); // 전략 실패시 호출