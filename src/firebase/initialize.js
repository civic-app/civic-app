import firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_API_KEY || 'AIzaSyCZKRQR4Q1x5mFWD1kD8vTo0uiXYWgWqNo',
  authDomain: process.env.REACT_APP_AUTH_DOMAIN || 'civic-app-ac266.firebaseapp.com',
  databaseURL: process.env.REACT_APP_DATABASE_URL || 'https://civic-app-ac266.firebaseio.com',
  projectId: process.env.REACT_APP_PROJECT_ID || 'civic-app-ac266',
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET || 'civic-app-ac266.appspot.com',
  messagingSenderId: process.env.REACT_APP_MESSAGEING_SENDER_ID || '506898842953',
};

const app = firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth(app)
export default firebase;

//export const database = firebase.database();
//export const auth = firebase.auth();
//export const storage = firebase.storage();
