import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBIMAgdLH0iYUiwVmYYGaTb7z2DLdbhtG0",
  authDomain: "nyart-dev-fd843.firebaseapp.com",
  databaseURL: 'https://nyart-dev-fd843.firebaseio.com/'
};

firebase.initializeApp(config);

export default firebase;

export const auth = firebase.auth();
export const database = firebase.database();
