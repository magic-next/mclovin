const admin = require('firebase-admin');

const { FIREBASE_ADMIN } = process.env;
const credentials = JSON.parse(FIREBASE_ADMIN);

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

module.exports = admin.firestore();
