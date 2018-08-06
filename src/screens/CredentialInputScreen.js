import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import colors from '../styles/colors';
import SocialButton from '../auth/SocialButton';
import firebase, { auth, provider } from '../firebase/initialize';
import Expo from 'expo';
import CredentialInput from '../welcome/LogIn';
//import { signInWithGoogleAsync, signInWithFacebookAsync } from '../auth/socialauth'

const LogIn = props => (
    <View style={styles.container}>
        <Text>Welcome! You are not logged in</Text>
        <Button title="Sign In" onPress={() => undefined} />
        <CredentialInput onSubmit={props.onLogInSubmit} />
        <Button title="Register" onPress={() => undefined} />
        <CredentialInput onSubmit={props.onRegisterSubmit} />
    </View>
);

LogIn.propTypes = {
    onLogInSubmit: PropTypes.func,
    onRegisterSubmit: PropTypes.func,
};

class CredentialInputScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      duplicatePassword: '',
      user: null
    };
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state.email, this.state.password);
  }

  checkPassword() {
    return this.state.password === this.state.duplicatePassword;
  }

  componentDidMount() {
      auth.onAuthStateChanged((user) => {
          if (user) {
              this.setState({ user });
          }
      });
  }

  logout = () => {
      auth.signOut()
          .then(() => {
              this.setState({
                  user: null
              });
          });
  }

  async signInWithGoogleAsync() {
      try {
          const result = await Expo.Google.logInAsync({
              androidClientId: '506898842953-a5djvc12er7cbmv78ajfjidokjmlropn.apps.googleusercontent.com',
              iosClientId: '506898842953-8nise7b8pq8ifdp9qpjta6d5no0l5u93.apps.googleusercontent.com',
              scopes: ['profile', 'email'],
          });

          if (result.type === 'success') {
              return result.accessToken;
          } else {
              return { cancelled: true };
          }
      } catch (e) {
          return { error: true };
      }
  }

  async signInWithFacebookAsync() {
      const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('206331633410454', {
          permissions: ['public_profile'],
      });
      if (type === 'success') {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(
              `https://graph.facebook.com/me?access_token=${token}`);
          Alert.alert(
              'Logged in!',
              `Hi ${(await response.json()).name}!`,
          );
      }
  }

  render() {
      return (
          <View style={styles.container}>
              <View style={styles.inputContainer}>
                  <Text style={styles.titleText}>Sign Up for Civic</Text>
                  <CredentialInput />
                  <Text style={styles.text}>or</Text>
                  <SocialButton
                      type="google"
                      title="Sign up with Google"
                      style={styles.social}
                      onPress={this.signInWithGoogleAsync}
                      onLongPress={this.signInWithGoogleAsync} />
                  <SocialButton type="facebook" title="Continue with Facebook" style={styles.social}
                      onPress={this.signInWithFacebookAsync}
                      onLongPress={this.signInWithFacebookAsync} />
                  <Text onPress={this.props.changeFormType} style={styles.text}>
                      Have an account? Sign In
          </Text>
              </View>
          </View>
      );
  }
}

CredentialInputScreen.propTypes = {
  onSubmit: PropTypes.func,
  changeFormType: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: colors.lightBlue,
    paddingTop: 10,
    paddingBottom: 10,
  },
  inputContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    maxHeight: 507,
    maxWidth: 369,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  social: {
    marginBottom: 8,
    marginLeft: 0,
    marginRight: 0,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 322,
  },
  submitButton: {
    textAlign: 'right',
    paddingTop: 20,
    fontSize: 18,
    color: colors.darkBlue,
  },
  textInput: {
    color: colors.black,
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray2,
  },
  titleText: {
    textAlign: 'left',
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 20,
  },
});

export default CredentialInputScreen;
