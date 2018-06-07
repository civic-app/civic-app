import { auth } from '../firebase/initialize'

export const register = ({ email, password }) => (
  auth.createUserWithEmailAndPassword(email, password)
    .catch(error => {
      // TODO: Handle Errors here.
      console.error('Error registering:', error.message)
    })
)

export const logIn = ({ email, password }) => (
  auth.signInWithEmailAndPassword(email, password)
    .catch(error => {
      // TODO: Handle Errors here.
      console.error('Error signing in:', error.message)
    })
)

export const logOut = (callback) => (
  auth.signOut()
    .then(() => {
      if (callback) callback(true, null, null)
    })
    .catch((error) => {
      if (callback) callback(false, null, error)
    })
)

export const subscribeToAuthStateChanges = (onLogIn, onLogOut) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      onLogIn(user)
      // ...
    } else {
      // User is signed out.
      onLogOut()
    }
  })
}

