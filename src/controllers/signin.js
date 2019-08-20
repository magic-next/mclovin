const httpStatus = require('http-status');

const factory = ({ usersService, utils, User }) => {
  const { to, createError } = utils;

  const auth = async (ctx) => {
    const { email, password } = ctx.request.body;
    const [err, user] = await to(User.findOne({ email }));
    if (err || !user) {
      throw createError({ message: 'User not exists!', status: httpStatus.NOT_FOUND });
    }
    const [e, verify] = await to(utils.verifyHash(password, user.password));
    if (e || !verify) {
      throw createError({ message: 'Password not match', status: httpStatus.UNAUTHORIZED });
    }
    if (!user.verified) {
      throw createError({ message: 'Unverified user', status: httpStatus.UNPROCESSABLE_ENTITY });
    }

    const token = usersService.authenticate(user);
    ctx.body = {
      token,
    };
  };

  return Object.freeze({ auth });
};

module.exports = factory;
