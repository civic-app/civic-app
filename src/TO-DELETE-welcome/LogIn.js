import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import colors from '../styles/colors';

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

export class CredentialInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleSubmit() {
    this.props.onSubmit(this.state.email, this.state.password);
  }
  render() {
    return (
      <View>
        <TextInput
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          placeholder="E-mail Address"
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={true}
          clearButtonMode="while-editing"
          keyboardType="email-address"
          style={styles.textInput}
        />
        <TextInput
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          keyboardType="email-address"
          style={styles.textInput}
        />
        <Button onPress={this.handleSubmit} style={styles.submitButton} title="Submit" />
      </View>
    );
  }
}

CredentialInput.propTypes = {
  onSubmit: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    color: colors.black,
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray2,
  },
  submitButton: {
    textAlign: 'right',
    paddingTop: 20,
    fontSize: 18,
    color: colors.darkBlue,
  },
});

export default LogIn;
