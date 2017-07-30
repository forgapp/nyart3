import firebase from 'firebase';

const config = {
  apiKey: process.env.API_KEY,
  authDomain: "nyart-dev-fd843.firebaseapp.com",
  databaseURL: 'https://nyart-dev-fd843.firebaseio.com/'
};

firebase.initializeApp(config);

export default firebase;

export const auth = firebase.auth();
export const database = firebase.database();
