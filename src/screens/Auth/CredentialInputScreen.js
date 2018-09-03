import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import FacebookAuthButton from './FacebookAuthButton';
import GoogleAuthButton from './GoogleAuthButton';
import colors from '../../styles/colors';
import { formTypes } from '../../auth/redux';

class CredentialInputScreen extends React.Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
    onSubmit: PropTypes.func.isRequired,
    formType: PropTypes.string.isRequired,
    changeFormType: PropTypes.func.isRequired,
    formIsValid: PropTypes.bool.isRequired,
    email: PropTypes.string.isRequired,
    updateEmail: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    updatePassword: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    updateErrorVisibility: PropTypes.func.isRequired,
    showErrors: PropTypes.bool.isRequired,
    duplicatePassword: PropTypes.string,
    updateDuplicatePassword: PropTypes.func,
  };

  static defaultProps = {
    duplicatePassword: '',
    updateDuplicatePassword: () => undefined,
  };

  componentDidUpdate() {
    if (this.props.isLoggedIn) {
      this.props.navigation.navigate('App');
    }
  }

  getOptions = (formType) => {
    switch (formType) {
      case formTypes.LOGIN:
        return {
          titleText: 'Sign in',
          changeFormText: "Don't have an account yet? Register",
          otherFormType: formTypes.SIGN_UP,
          googleButtonText: 'Sign in with Google',
        };
      case formTypes.SIGN_UP:
        return {
          titleText: 'Sign Up for Civic',
          changeFormText: 'Have an account? Sign in',
          otherFormType: formTypes.LOGIN,
          googleButtonText: 'Sign up with Google',
        };
      default:
        return {};
    }
  };

  handleSubmit = () => {
    if (!this.props.isLoading) {
      if (this.props.formIsValid) {
        this.props.onSubmit();
      } else {
        this.props.updateErrorVisibility(true);
      }
    }
  };

  render() {
    const options = this.getOptions(this.props.formType);
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.titleText}>{options.titleText}</Text>
          <EmailInput value={this.props.email} onChangeText={this.props.updateEmail} />
          <PasswordInput value={this.props.password} onChangeText={this.props.updatePassword} />
          {this.props.formType === formTypes.SIGN_UP && (
            <PasswordInput
              value={this.props.duplicatePassword}
              onChangeText={this.props.updateDuplicatePassword}
              placeholder="Re-type password"
            />
          )}
          {this.props.showErrors && <Text style={styles.errorMessage}>{this.props.errorMessage}</Text>}
          <Text onPress={this.handleSubmit} style={styles.submitButton}>
            SUBMIT
          </Text>
          <Text style={styles.text}>or</Text>
          <GoogleAuthButton title={options.googleButtonText} style={styles.social} />
          <FacebookAuthButton title="Continue with Facebook" style={styles.social} />
          <Text onPress={() => this.props.changeFormType(options.otherFormType)} style={styles.text}>
            {options.changeFormText}
          </Text>
        </View>
      </View>
    );
  }
}

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
  errorMessage: {
    color: colors.red,
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 4,
    paddingBottom: 4,
  },
});

export default CredentialInputScreen;
