import { auth } from '../firebase/initialize';
import parseFirebaseErrorCode from '../firebase';

export const registerWithEmailAndPassword = (email, password) => auth.createUserWithEmailAndPassword(email, password);

export const logInWithEmailAndPassword = (email, password) => auth.signInWithEmailAndPassword(email, password);

export const logOut = callback => auth
  .signOut()
  .then(() => {
    if (callback) callback(true, null, null);
  })
  .catch((error) => {
    if (callback) callback(false, null, error);
    throw error;
  });

export const subscribeToAuthStateChanges = (onLogIn, onLogOut) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      onLogIn(user);
      // ...
    } else {
      // User is signed out.
      onLogOut();
    }
  });
};

export const parseErrorResponse = error => parseFirebaseErrorCode(error);
