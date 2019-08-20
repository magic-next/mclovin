const reducer = (skell, raw) => Object.entries(skell)
  .reduce((prev, [key]) => {
    if (raw[key]) {
      Object.assign(prev, { [key]: raw[key] });
    }
    return prev;
  }, {});

/**
 * Create a entity with the configuration given
 * @param {object} config Configuration of entity
 * @param {FirebaseFirestore} config.db
 * @param {string} config.collection
 * @param {object} config.schema
 */
const Entity = ({ db, collection, schema }) => {
  const coll = db.collection(collection);

  /**
   * Insert the entity instance
   * @param {object} doc Document to insert into collection
   * @returns {Promise}
   */
  const insert = (doc) => {
    const toInsert = reducer(schema, doc);
    return coll.add(toInsert)
      .then((ref) => ({ id: ref.id, ...toInsert }));
  };

  return Object.freeze({
    insert,
  });
};

module.exports = Entity;
