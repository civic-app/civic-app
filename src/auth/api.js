import { auth } from '../firebase'

export const getCurrentUser = () => (
  auth.currentUser
)

export const isLoggedIn = () => (
  !!auth.currentUser
)

export const register = (email, password) => (
  auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
    // TODO: Handle Errors here.
    console.error('Error registering:', error.message)
  })
)

export const logIn = (email, password) => (
  auth.signInWithEmailAndPassword(email, password).catch(function(error) {
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
