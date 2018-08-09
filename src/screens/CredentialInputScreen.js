import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { StyleSheet, View, Text, TextInput } from 'react-native';
import colors from '../styles/colors';
import SocialButton from '../auth/SocialButton';
import firebase, { auth, provider } from '../firebase/initialize';
import Expo from 'expo';
import { CredentialInput } from '../welcome/LogIn';
import { getIsLoggedIn, register, loginSuccess, logOutSuccess } from '../auth/redux'
import { signInWithFacebookAsync as fbSignIn, signInWithGoogleAsync as googleSignIn } from '../auth/socialauth';

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
              this.props.onLogIn(user);
          }
      });
  }

  async signInWithGoogleAsync() {
      const resp = await googleSignIn()
      if (resp !== 'fail') {
          Alert.alert(
              'Logged in via Google!',
          );
          this.props.navigate('Home')
      }
      else {
          Alert.alert('something went wrong!')
      }
  }

  async signInWithFacebookAsync() {
      const resp = await fbSignIn()
      if (resp !== 'fail') {
          Alert.alert(
              'Logged in via Facebook!',
          );
          this.props.navigate('Home')
      }
      else {
          Alert.alert('something went wrong!')
      }
  }

  render() {
    if (this.props.isLoggedIn) {
      this.gotToSurvey();
    }
      return (
          <View style={styles.container}>
              <View style={styles.inputContainer}>
                  <Text style={styles.titleText}>Sign Up for Civic</Text>
                  <CredentialInput onSubmit={this.props.register}/>
                  <Text style={styles.text}>or</Text>
                  <SocialButton
                      type="google"
                      title="Sign up with Google"
                      style={styles.social}
                      onPress={this.signInWithGoogleAsync.bind(this)}
                      onLongPress={this.signInWithGoogleAsync.bind(this)} />
                  <SocialButton type="facebook" title="Continue with Facebook" style={styles.social}
                      onPress={this.signInWithFacebookAsync.bind(this)}
                      onLongPress={this.signInWithFacebookAsync.bind(this)} />
                  <Text onPress={this.props.changeFormType} style={styles.text}>
                      Have an account? Sign In
          </Text>
              </View>
          </View>
      );
  }
}

CredentialInputScreen.propTypes = {
  isLoggedIn: PropTypes.bool,
  onSubmit: PropTypes.func,
  changeFormType: PropTypes.func,
  register: PropTypes.func,
  onLogIn: PropTypes.func,
  onLogOut: PropTypes.func,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    push: PropTypes.func,
  }),
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

export default connect(
  (state) => ({ isLoggedIn: getIsLoggedIn(state) }),
  { register, onLogIn: loginSuccess, onLogOut: logOutSuccess },
)(CredentialInputScreen);
