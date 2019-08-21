const httpStatus = require('http-status');

const factory = () => {
  const middleware = async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      console.error(error);
      ctx.status = error.status || httpStatus.INTERNAL_SERVER_ERROR;
      ctx.body = {
        error: true,
        message: error.message,
      };
    }
  };

  return middleware;
};

module.exports = factory;
