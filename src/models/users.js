const bcrypt = require('bcrypt');
const Entity = require('./entity');

const schema = {
  email: String,
  password: String,
};

const factory = ({ db, config }) => {
  const User = Entity({ db, schema, collection: 'users' });

  const mapper = ({ id, email }) => ({
    id,
    email,
  });

  const insert = async (doc) => {
    const password = await bcrypt.hash(doc.password, config.salt);
    return User.insert({ ...doc, password })
      .then(mapper);
  };

  return Object.freeze({
    ...User,
    insert,
  });
};

module.exports = factory;
