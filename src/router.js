const Router = require('koa-router');

const routerFactory = ({ signInController }) => {
  const router = new Router();
  router.post('/users', signInController.createUser);

  return router;
};

module.exports = routerFactory;
