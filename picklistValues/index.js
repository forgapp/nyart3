//const firebase = require('firebase');
const fs = require('fs');
const { resolve } = require('path');
const firebaseAdmin = require("firebase-admin");
const serviceAccount = require(resolve(__dirname, 'key.json'));

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://nyart-dev-fd843.firebaseio.com/"
});

const database = firebaseAdmin.database();

fs.readdir(resolve(__dirname, 'values'), function(err, files) {
  if(err) {
    process.exitCode = 1;
    throw new Error(err);
  }

  files
    .filter(file => file.match(/.json$/))
    .forEach(file => {
      const picklist = require(resolve(__dirname, 'values', file));
      uploadPicklist(picklist.Type, picklist.Values);
    });
});

function uploadPicklist(type, values) {
  const ref = database.ref("Picklists")
    .child(type);

  ref.remove()
    .then(() => {
      ref.set(values).then(snapshot => console.log(`${type} Done.`));
    });
}