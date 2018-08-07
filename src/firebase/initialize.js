import firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_API_KEY || 'AIzaSyB5hM6R8k3FzXuaIk_Hy3SGf0Owty2x6B4',
  authDomain: process.env.REACT_APP_AUTH_DOMAIN || 'civic-app-cb9a8.firebaseapp.com',
  databaseURL: process.env.REACT_APP_DATABASE_URL || 'https://civic-app-cb9a8.firebaseio.com',
  projectId: process.env.REACT_APP_PROJECT_ID || 'civic-app-cb9a8',
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET || 'civic-app-cb9a8.appspot.com',
  messagingSenderId: process.env.REACT_APP_MESSAGEING_SENDER_ID || '664717193548',
};

firebase.initializeApp(config);

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();

export const getByPath = tablePath =>
  database
    .ref(tablePath)
    .once('value')
    .then(snapshot => snapshot.val());
