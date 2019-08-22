const httpStatus = require('http-status');

const factory = ({ utils, config }) => {
  const middleware = async (ctx, next) => {
    const { authorization = '' } = ctx.headers;
    const token = authorization.replace(/^Bearer\s/i, '');
    const data = utils.verify(token, config.applicationKey);
    if (!data.access) {
      throw utils.createError({ message: 'Unathorized', status: httpStatus.UNAUTHORIZED });
    }
    return next();
  };

  return middleware;
};

module.exports = factory;
