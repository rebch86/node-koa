const KoaRouter = require('koa-router');
const fs = require('fs');
const router = new KoaRouter();

const dbConnection = require('../db/mysql-connection');

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

router.post('/regist/members', async (ctx, next) => {
    const param = ctx.request.body;

    ctx.response.type = 'application/json';
    ctx.response.status = 200;
    let resultObject = null;

    if (!param) {
        resultObject = {
            status: ctx.response.status,
            error: 'Not Parameter',
        };
    }

    const connection = await dbConnection();
    const selectSql = `SELECT * FROM user WHERE userId='${param.userId}'`;
    const createSql = `INSERT INTO user(userId, password, name, gender, age, address, addressDetail, zipCode, createDate) VALUES('${param.userId}','${param.password}','${param.name}','${param.gender}','${param.age}','${param.address}','${param.addressDetail}','${param.zipcode}', CURDATE())`;
    // console.log(connection);

    const [results] = await connection.query(selectSql);

    if (results.length == 0) {
        try {
            await connection.beginTransaction(); // begin TRANSACTION
            const [insertResult] = await connection.query(createSql);
            await connection.commit(); // COMMIT
            connection.close();
            resultObject = {
                status: ctx.response.status,
                message: '가입이 성공적으로 완료되었습니다.',
                user: insertResult,
            };

        } catch (err) {
            console.log(err);
            await connection.rollback(); // ROLLBACK
            connection.close();
            resultObject = {
                status: ctx.response.status,
                error: 'SQL 오류 입니다.',
            }
        }

    } else {
        connection.close();
        resultObject = {
            status: ctx.response.status,
            error: '중복된 ID 입니다.',
        };
    }


    // connection.query(selectSql, function (err, results, fileds) {
    //     if (results.length == 0) {
    //         console.log('no data..');
    //     } else {
    //         // console.log(results);
    //         connection.close();
    //         const failObject = {
    //             status: ctx.response.status,
    //             error: '중복된 ID 입니다.',
    //         };
    //         ctx.response.body = JSON.stringify(failObject);
    //         // await next();
    //     }
    // });
    //
    // console.log('test');


    // const resultObject = {
    //   status : ctx.response.status,
    //   message : 'success',
    // };
    // ctx.response.body = JSON.stringify(resultObject);

    ctx.response.body = JSON.stringify(resultObject);

});

module.exports = router;
