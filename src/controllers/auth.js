const httpStatus = require('http-status');

const factory = ({ config, utils, usersService }) => {
  const { verify } = utils;

  const confirm = async (ctx) => {
    const { token } = ctx.params;
    try {
      const data = verify(token, config.privateKey);
      if (!data.confirmationId) {
        throw new Error('Unathorized');
      }
      const user = await usersService.confirm({ email: data.confirmationId });
      ctx.body = user;
    } catch (error) {
      ctx.error('Error', error);
      throw utils.createError({ message: 'Unathorized', status: httpStatus.UNAUTHORIZED });
    }
  };

  const sendConfirm = () => null;

  return Object.freeze({
    confirm,
    sendConfirm,
  });
};

module.exports = factory;
