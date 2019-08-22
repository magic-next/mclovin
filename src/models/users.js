const Entity = require('./entity');

const schema = {
  email: String,
  password: String,
  verified: Boolean,
};

const factory = ({ db, config, utils }) => {
  const User = Entity({ db, schema, collection: 'users' });

  const mapper = ({ id, email }) => ({
    id,
    email,
  });

  const insert = async (doc) => {
    const password = await utils.hash(doc.password, config.salt);
    return User.insert({ ...doc, password })
      .then(mapper);
  };

  return Object.freeze({
    ...User,
    insert,
  });
};

module.exports = factory;
