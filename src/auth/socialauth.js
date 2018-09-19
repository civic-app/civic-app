import Expo from 'expo';
import { auth, facebookAuthProvider, googleAuthProvider } from '../firebase/initialize';

export async function signInWithGoogleAsync() {
  const result = await Expo.Google.logInAsync({
    androidClientId: process.env.REACT_NATIVE_GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: process.env.REACT_NATIVE_GOOGLE_IOS_CLIENT_ID,
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
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(process.env.REACT_NATIVE_FACEBOOK_APP_ID, {
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
