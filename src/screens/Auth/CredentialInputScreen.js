import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import SocialButton from './SocialButton';
import colors from '../../styles/colors';
import { formTypes } from '../../auth/redux/formReducer';

const CredentialInputScreen = props => {
  const options = (formType => {
    switch (formType) {
      case formTypes.LOGIN:
        return {
          titleText: 'Sign in',
          changeFormText: 'Don\'t have an account yet? Register',
          otherFormType: formTypes.SIGN_UP,
        };
      case formTypes.SIGN_UP:
        return {
          titleText: 'Sign Up for Civic',
          changeFormText: 'Have an account? Sign in',
          otherFormType: formTypes.LOGIN,
        };
      default:
        return {};
    }
  })(props.formType);

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
        <Text onPress={this.handleSubmit} style={styles.submitButton}>
          SUBMIT
        </Text>
        <Text style={styles.text}>or</Text>
        <SocialButton type="google" title="Sign up with Google" style={styles.social} />
        <SocialButton type="facebook" title="Continue with Facebook" style={styles.social} />
        <Text onPress={() => props.changeFormType(options.otherFormType)} style={styles.text}>
          {options.changeFormText}
        </Text>
      </View>
    </View>
  );
};

CredentialInputScreen.propTypes = {
  // TODO: use actual submit login function
  // onSubmit: PropTypes.func,
  formType: PropTypes.string.isRequired,
  changeFormType: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  updateEmail: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  updatePassword: PropTypes.func.isRequired,
  duplicatePassword: PropTypes.string,
  updateDuplicatePassword: PropTypes.func,
  errorMessage: PropTypes.string,
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
