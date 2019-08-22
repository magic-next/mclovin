const Router = require('koa-router');

const routerFactory = ({ signUpController, signInController, authController }) => {
  const router = new Router();
  router.post('/users', signUpController.createUser);
  router.post('/auth', signInController.auth);
  router.get('/confirmation/:token', authController.confirm);
  router.post('/confirm/:email', authController.sendConfirm);

  return router;
};

module.exports = routerFactory;
