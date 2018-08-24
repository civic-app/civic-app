import Expo from 'expo';
import firebase, { auth } from '../firebase/initialize';

export async function signInWithGoogleAsync() {
  try {
    const result = await Expo.Google.logInAsync({
      androidClientId: '506898842953-a5djvc12er7cbmv78ajfjidokjmlropn.apps.googleusercontent.com',
      iosClientId: '506898842953-8nise7b8pq8ifdp9qpjta6d5no0l5u93.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);
      return auth.signInAndRetrieveDataWithCredential(credential);
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
}

export async function signInWithFacebookAsync() {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('206331633410454', {
    permissions: ['email', 'public_profile'],
  });
  if (type === 'success') {
    // Build Firebase credential with the Facebook access token.
    const credential = firebase.auth.FacebookAuthProvider.credential(token);
    // Sign in with credential from the Facebook user.
    auth.signInAndRetrieveDataWithCredential(credential).catch(() => {
      // Handle Errors here.
    });
  }
}
