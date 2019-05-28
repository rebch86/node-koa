const passport = require('koa-passport');
const localStrategy = require('passport-local').Strategy; // local 로그인 전략

const passportJWT = require('passport-jwt');
const jwtStrategy = require('passport-jwt').Strategy; // jwt 로그인 전략
const jwt = require('jsonwebtoken');
const ExtractJWT = passportJWT.ExtractJwt;


const dbConnection = require('./../db/mysql-connection');

// https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314
// usernameField / passwordField는 어떤 폼 필드로부터 아이디와 비밀번호를 전달받을 지 설정
// session -> 세션 저장여부
passport.use(new localStrategy({
        usernameField: 'userId',
        passwordField: 'password',
        passReqToCallback: true,
    },
    function (request, userId, password, done) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT

        // dbConnection().then(connection => {
        //     connection.query(`SELECT * FROM user WHERE userId = '${userId}' AND password = ${password}`,
        //         function (err, results, fileds) {
        //             if (err) {
        //                 console.log(err);
        //                 connection.close();
        //                 return (false, null); // 무조건 실패하는 경우
        //             } else {
        //                 if (results.length == 0) {
        //                     connection.close();
        //                     return done(null, null,  { message: '존재하지 않는 사용자 또는 비밀번호가 틀렸습니다.' }); // 임의 에러 처리
        //                 } else {
        //                     // console.log(results[0]);
        //                     connection.close();
        //                     return done(null, results[0]); // 검증 성공
        //                 }
        //             }
        //         });
        // });

        dbConnection().then(connection => {
            connection.query(`SELECT * FROM user WHERE userId = '${userId}' AND password = ${password}`,
                function (err, results, fileds) {
                    if (err) {
                        console.log(err);
                        connection.close();
                        return (false, null); // 무조건 실패하는 경우
                    } else {
                        if (results.length == 0) {
                            connection.close();
                            return done(null, null,  { message: '존재하지 않는 사용자 또는 비밀번호가 틀렸습니다.' }); // 임의 에러 처리
                        } else {
                            connection.close();

                        }
                    }
                });
        });


    }
));

//done(p1, p2, p3)
// p1 : error / p2 : 성공 시, 리턴값 / p3 : 커스텀 error

passport.serializeUser((user, done) => {
    // 세션에 저장
    console.log('serializeUser');
    done(null, user);
});

passport.deserializeUser((user, done) => {
    // deserializeUser은 실제 서버로 들어오는 요청마다 세션 정보(serializeUser에서 저장됨)를 실제 DB의 데이터와 비교
    console.log('deserializeUser');
    if(user) {
        done(null, user);
    } else {
        console.log('세션 만료!');
        done(null, null,  { message: '로그인이 끊겼습니다. 다시 시도해 주세요.'});
    }

});

passport.use(new jwtStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : process.env.JWT_SECRET,
    },
    function (jwtPayload, cb) {
        //find the user in db if needed
    }
));

