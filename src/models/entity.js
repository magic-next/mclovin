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
  const formatter = (doc) => {
    if (!doc) {
      return doc;
    }
    return { id: doc.id, ...doc.data() };
  };

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

  /**
   * Find one document by filters
   * @param {object} filter Filter to search
   * @returns {Promise}
   */
  const findOne = async (filter) => {
    const ref = Object.entries(filter)
      .reduce((prev, [key, val]) => prev.where(key, '==', val), coll);
    return ref
      .limit(1)
      .get()
      .then((snap) => formatter(snap.docs[0]));
  };

  return Object.freeze({
    insert,
    findOne,
  });
};

module.exports = Entity;
