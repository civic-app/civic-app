import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import colors from '../../styles/colors';
import SocialButton from './SocialButton';

class CredentialInputScreen extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      email: '',
      password: '',
      duplicatePassword: '',
    };
  }

  handleSubmit() {
    // TODO: use actual login function
    // this.props.onSubmit(this.state.email, this.state.password);
    this.props.navigation.navigate('Survey');
  }

  checkPassword() {
    return this.state.password === this.state.duplicatePassword;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.titleText}>Sign Up for Civic</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus={true}
            clearButtonMode="while-editing"
            keyboardType="email-address"
            style={styles.textInput}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            placeholder="E-mail address"
          />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="while-editing"
            style={styles.textInput}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            secureTextEntry={true}
            placeholder="Password"
          />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="while-editing"
            style={styles.textInput}
            value={this.state.duplicatePassword}
            onChangeText={duplicatePassword => this.setState({ duplicatePassword })}
            onEndEditing={this.checkPassword}
            returnKeyType="done"
            secureTextEntry={true}
            placeholder="Re-type password"
          />
          <Text onPress={this.handleSubmit} style={styles.submitButton}>
            SUBMIT
          </Text>
          <Text style={styles.text}>or</Text>
          <SocialButton type="google" title="Sign up with Google" style={styles.social} />
          <SocialButton type="facebook" title="Continue with Facebook" style={styles.social} />
          <Text onPress={this.props.changeFormType} style={styles.text}>
            Have an account? Sign In
          </Text>
        </View>
      </View>
    );
  }
}

CredentialInputScreen.propTypes = {
  // TODO: use actual submit login function
  // onSubmit: PropTypes.func,
  changeFormType: PropTypes.func,
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

export default CredentialInputScreen;
