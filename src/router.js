const Router = require('koa-router');
const controllerFactory = require('./controllers/sigin');

const router = new Router();
const controller = controllerFactory();

router.post('/users', controller.createUser);

module.exports = router;
