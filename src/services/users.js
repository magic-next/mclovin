const factory = ({ User, utils, config }) => {
  /**
   * Create a user
   * @param {object} doc Document to insert
   */
  const create = async (doc) => {
    const user = await User.findOne({ email: doc.email });
    if (user) {
      throw new Error('User already exists!');
    }
    return User.insert({ ...doc, verified: false });
  };

  /**
   * Authenticate user credentials
   * @param {object} credentials
   * @param {string} credentials.email
   * @param {string} credentials.password
   * @return {Promise}
   */
  const authenticate = (user) => utils.sign(user, config.privateKey);

  /**
   * Confirm user email
   * @param {object} config Configuration
   * @param {string} config.email User email to confirm address
   * @returns {Promise}
   */
  const confirm = ({ email }) => User.update({ email }, { verified: true });

  return Object.freeze({ create, authenticate, confirm });
};

module.exports = factory;
