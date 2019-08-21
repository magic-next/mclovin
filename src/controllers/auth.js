const httpStatus = require('http-status');

const factory = ({ config, utils, usersService }) => {
  const { verify, sign } = utils;

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
      console.log('Error', error);
      throw utils.createError({ message: 'Unathorized', status: httpStatus.UNAUTHORIZED });
    }
  };

  const sendConfirm = (ctx) => {
    const { email } = ctx.params;
    ctx.body = { token: sign({ confirmationId: email }, config.privateKey) };
  };

  return Object.freeze({
    confirm,
    sendConfirm,
  });
};

module.exports = factory;
