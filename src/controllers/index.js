const signUpController = require('./signup');
const signInController = require('./signin');
const authController = require('./auth');

module.exports = Object.freeze({
  authController,
  signInController,
  signUpController,
});
