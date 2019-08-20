const factory = ({ User, utils }) => {
  const { to } = utils;

  /**
   * Create a user
   * @param {object} doc Document to insert
   */
  const create = async (doc) => {
    const user = await User.findOne({ email: doc.email });
    if (user) {
      throw new Error('User already exists!');
    }
    return User.insert(doc);
  };

  /**
   * Authenticate user credentials
   * @param {object} credentials
   * @param {string} credentials.email
   * @param {string} credentials.password
   * @return {Promise}
   */
  const authenticate = async ({ email, password }) => {
    const [err, user] = await to(User.findOne({ email }));
    if (err || !user) {
      throw new Error('User not exists!');
    }
    const [e, verify] = await to(utils.verifyHash(password, user.password));
    if (e || !verify) {
      throw new Error('Password not match');
    }
    return user;
  };

  return Object.freeze({ create, authenticate });
};

module.exports = factory;
