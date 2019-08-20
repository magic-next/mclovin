const factory = ({ usersService }) => {
  const auth = async (ctx) => {
    const token = await usersService.authenticate(ctx.request.body);
    ctx.body = {
      token,
    };
  };

  return Object.freeze({ auth });
};

module.exports = factory;
