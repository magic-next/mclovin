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

module.exports = {
  to,
  createError,
};
