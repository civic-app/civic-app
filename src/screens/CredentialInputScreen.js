import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import colors from '../styles/colors';
import SocialButton from '../auth/SocialButton';
import { auth } from '../firebase/initialize';
import { signInWithGoogleAsync, signInWithFacebookAsync } from '../auth/socialauth'

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

  expandedView = formType => {
    const config = (type => {
      switch (type) {
        case formTypes.INITIAL:
          return {};
        case formTypes.LOGIN:
          return {
            preposition: 'in',
            title: 'into',
            switchText: 'Don\'t have an account yet? Register',
            otherFormType: formTypes.SIGN_UP,
          };
        case formTypes.SIGN_UP:
          return {
            preposition: 'up',
            title: 'up for',
            switchText: 'Have an account? Sign in',
            otherFormType: formTypes.LOGIN,
          };
      }
    })(formType);

    screenState = () => {
      if (this.formType == formTypes.LOGIN) {
        return null;
      } else {
        return (
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
        );
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.titleText}>{`Sign ${config.title} Civic`}</Text>
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
          return (
          <View>
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
            {this.screenState()}
          </View>
          <Text onPress={this.handleSubmit} style={styles.submitButton}>
            SUBMIT
          </Text>
          <Text style={styles.text}>or</Text>
          <SocialButton
            type="google"
            title={`Sign ${config.preposition} with Google`}
            style={styles.social}
            onPress={this.signInWithGoogleAsync}
            onLongPress={this.signInWithGoogleAsync} />
          <SocialButton type="facebook" title="Continue with Facebook" style={styles.social}
            onPress={this.signInWithFacebookAsync}
            onLongPress={this.signInWithFacebookAsync}/>
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
