const Router = require('koa-router');

const basic = require('./basic-router');
const index = require('./index-router');

const router = new Router();

router.use('/', basic.routes());
router.use('/index', index.routes());

console.log(router);

module.exports = router;
