const httpStatus = require('http-status');

const factory = ({ usersService }) => {
  const controller = {};

  controller.createUser = async (ctx) => {
    const { body } = ctx.request;
    try {
      const doc = await usersService.create(body);
      ctx.body = doc;
    } catch (error) {
      ctx.status = httpStatus.CONFLICT;
      ctx.body = {
        error: true,
        message: error.message,
      };
    }
  };

  return Object.freeze(controller);
};

module.exports = factory;
