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
    // const [err, doc] = await to(usersService.create(body));
    // if (err) {
    //   throw createError({
    //     message: err.message,
    //     status: httpStatus.CONFLICT,
    //   });
    // }
    const token = sign({ confirmationId: body.email }, config.privateKey);
    // Surround notification (user resend email requests)
    notificationsService.notifyCreate({ email: body.email, token })
      .catch(console.error);
    ctx.body = { user: body };
  };

  return Object.freeze({
    createUser,
  });
};

module.exports = factory;
