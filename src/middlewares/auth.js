const httpStatus = require('http-status');

const factory = ({ utils, config }) => {
  const middleware = async (ctx, next) => {
    const { authorization = '' } = ctx.headers;
    const token = authorization.replace(/^Bearer\s/i, '');
    try {
      const data = utils.verify(token, config.applicationKey);
      if (!data.access) {
        throw new Error('Unathorized');
      }
      return next();
    } catch (error) {
      ctx.logger.error(error);
      throw utils.createError({ message: 'Unathorized', status: httpStatus.UNAUTHORIZED });
    }
  };

  return middleware;
};

module.exports = factory;
