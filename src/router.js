const Router = require('koa-router');

const routerFactory = ({ signUpController, signInController }) => {
  const router = new Router();
  router.post('/users', signUpController.createUser);
  router.post('/auth', signInController.auth);

  return router;
};

module.exports = routerFactory;
