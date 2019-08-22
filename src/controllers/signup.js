const httpStatus = require('http-status');

const factory = ({
  usersService,
  utils,
  config,
  notificationsService,
}) => {
  const { to, createError, sign } = utils;

  const createUser = async (ctx) => {
    const { body } = ctx.request;
    const [err, doc] = await to(usersService.create(body));
    if (err) {
      throw createError({
        message: err.message,
        status: httpStatus.CONFLICT,
      });
    }
    const token = sign({ confirmationId: doc.email }, config.privateKey);
    await notificationsService.notifyCreate({ email: doc.email, token });
    ctx.body = { user: doc };
  };

  return Object.freeze({
    createUser,
  });
};

module.exports = factory;
