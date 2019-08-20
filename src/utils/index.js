const bcrypt = require('bcrypt');

/**
 * Promise wrapper to elegant async/await use
 * @param {Promise} promise Promise to be wrapped
 * @returns {Promise}
 */
const to = (promise) => promise
  .then((data) => [null, data])
  .catch((err) => [err, null]);
exports.to = to;

/**
 * Error factory
 * @param {object} config Error configuration
 * @param {string} config.message Message of error
 * @param {number} [status] HTTP Status of response (default 400)
 * @returns {Error}
 */
const createError = ({ message, status = 400 }) => {
  const err = new Error(message);
  err.status = status;
  return err;
};
exports.createError = createError;

/**
 * Bcrypt
 * @param {string} data Data to be encrypted
 * @param {string} salt Salt
 * @returns {Promise}
 */
const hash = (data, salt) => bcrypt.hash(data, salt);
exports.hash = hash;

/**
 * Verify if data matches with encrypted text
 * @param {string} data Data to be verified
 * @param {string} encrypted Encrypted text
 * @returns {Promise}
 */
const verifyHash = (data, encrypted) => bcrypt.compare(data, encrypted);
exports.verifyHash = verifyHash;

module.exports = {
  to,
  createError,
  hash,
  verifyHash,
};
