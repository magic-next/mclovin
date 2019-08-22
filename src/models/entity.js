const reducer = (skell, raw) => Object.entries(skell)
  .reduce((prev, [key]) => {
    if (key in raw) {
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
   * @param {Boolean} [safe] Remove sensive data when safe is true
   * @returns {Promise}
   */
  const findOne = async (filter, safe = true) => {
    const ref = Object.entries(filter)
      .reduce((prev, [key, val]) => prev.where(key, '==', val), coll);
    const snap = await ref
      .limit(1)
      .get();
    if (!safe) {
      return snap;
    }
    return formatter(snap.docs[0]);
  };

  /**
   * Update a document by filter
   * @param {object} filter Filter to get document to updates
   * @param {object} data Data to be updated
   * @returns {Promise}
   */
  const update = async (filter, data) => {
    const document = await findOne(filter);
    if (!document) {
      return null;
    }
    const ref = coll.doc(document.id);
    await ref.update(data);
    return { ...document, ...data };
  };

  return Object.freeze({
    insert,
    update,
    findOne,
  });
};

module.exports = Entity;
