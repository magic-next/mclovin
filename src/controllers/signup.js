const httpStatus = require('http-status');

const factory = ({ usersService, utils }) => {
  const { to, createError } = utils;

  const createUser = async (ctx) => {
    const { body } = ctx.request;
    const [err, doc] = await to(usersService.create(body));
    if (err) {
      throw createError({
        message: err.message,
        status: httpStatus.CONFLICT,
      });
    }
    ctx.body = { user: doc };
  };

  return Object.freeze({
    createUser,
  });
};

module.exports = factory;
