const factory = ({ User }) => {
  const create = async (doc) => {
    const user = await User.findOne({ email: doc.email });
    if (user) {
      throw new Error('User already exists!');
    }
    return User.insert(doc);
  };

  return Object.freeze({ create });
};

module.exports = factory;
