import Expo from 'expo';
import { auth, facebookAuthProvider, googleAuthProvider } from '../firebase/initialize';

export async function signInWithGoogleAsync() {
  const result = await Expo.Google.logInAsync({
    androidClientId: '506898842953-a5djvc12er7cbmv78ajfjidokjmlropn.apps.googleusercontent.com',
    iosClientId: '506898842953-8nise7b8pq8ifdp9qpjta6d5no0l5u93.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
  });

  if (result.type === 'success') {
    // Build Firebase credential with the Google access token.
    const credential = googleAuthProvider.credential(result.idToken, result.accessToken);
    // Sign in with credential from the Google user.
    return auth.signInAndRetrieveDataWithCredential(credential);
  }
  // Login request either user cancelled or rejected by google.
  // TODO: what should we do here?
  return Promise.reject('Failed google login');
}

export async function signInWithFacebookAsync() {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('206331633410454', {
    permissions: ['email', 'public_profile'],
  });
  if (type === 'success') {
    // Build Firebase credential with the Facebook access token.
    const credential = facebookAuthProvider.credential(token);
    // Sign in with credential from the Facebook user.
    return auth.signInAndRetrieveDataWithCredential(credential);
  }
  // Login request either user cancelled or rejected by facebook.
  // TODO: what should we do here?
  return Promise.reject('Failed facebook login');
}
