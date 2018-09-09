import { database } from './initialize';
/*
 * Every error from the firebase api has a standard code and message.
 * Use this method to show an appropriate error message to the user,
 * overwriting the default firebase message if it is inappropriate.
 * Never display the stack trace from an error to the user!!
 *
 * See https://firebase.google.com/docs/reference/js/firebase.FirebaseError for a
 * high level description of firebase errors. Each section of the firebase api
 * provides description of the specific errors you can expect.
 */
export const parseFirebaseErrorCode = error => {
  const { code, message } = error;
  switch (code) {
    default:
      return message;
  }
};

export const getByPath = tablePath =>
  database
    .ref(tablePath)
    .once('value')
    .then(snapshot => snapshot.val());

export const setByPath = (tablePath, newVal) => database.ref(tablePath).set(newVal);
