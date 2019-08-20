const Router = require('koa-router');

const routerFactory = ({ signUpController }) => {
  const router = new Router();
  router.post('/users', signUpController.createUser);

  return router;
};

module.exports = routerFactory;
