import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import FacebookAuthButton from './FacebookAuthButton';
import GoogleAuthButton from './GoogleAuthButton';
import colors from '../../styles/colors';
import { formTypes } from '../../auth/redux';

const CredentialInputScreen = props => {
  let options = {};
  switch (props.formType) {
    case formTypes.LOGIN:
      options = {
        titleText: 'Sign in',
        changeFormText: 'Don\'t have an account yet? Register',
        otherFormType: formTypes.SIGN_UP,
        googleButtonText: 'Continue with Google',
      };
      break;
    case formTypes.SIGN_UP:
      options = {
        titleText: 'Sign up for Civic',
        changeFormText: 'Have an account? Sign in',
        otherFormType: formTypes.LOGIN,
        googleButtonText: 'Continue with Google',
      };
      break;
    default:
      break;
  }

  const handleSubmit = () => {
    if (!props.isLoading) {
      if (props.formIsValid) {
        props.onSubmit();
      } else {
        props.updateErrorVisibility(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.titleText}>{options.titleText}</Text>
        <EmailInput value={props.email} onChangeText={props.updateEmail} />
        <PasswordInput value={props.password} onChangeText={props.updatePassword} />
        {props.formType === formTypes.SIGN_UP && (
          <PasswordInput
            value={props.duplicatePassword}
            onChangeText={props.updateDuplicatePassword}
            placeholder="Re-type password"
          />
        )}
        {props.showErrors && <Text style={styles.errorMessage}>{props.errorMessage}</Text>}
        <Text onPress={handleSubmit} style={styles.submitButton}>
          SUBMIT
        </Text>
        <View style={{marginTop: 20}}>
          <GoogleAuthButton title={options.googleButtonText} style={styles.social} />
          <FacebookAuthButton title="Continue with Facebook" style={styles.social} />
        </View>
        <Text onPress={() => props.changeFormType(options.otherFormType)} style={styles.text}>
          {options.changeFormText}
        </Text>
      </View>
    </View>
  );
};

CredentialInputScreen.propTypes = {
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

CredentialInputScreen.defaultProps = {
  duplicatePassword: '',
  updateDuplicatePassword: () => undefined,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
    padding: 10
  },
  inputContainer: {
    flex:1,
    backgroundColor: colors.white,
    borderRadius: 25,
    flexDirection: 'column',
    justifyContent: 'center',
    maxHeight: 480,
    maxWidth: 360,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%'
  },
  social: {
    marginBottom: 8,
    marginLeft: 0,
    marginRight: 0,
    alignSelf: 'center',
    width: '100%',
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
