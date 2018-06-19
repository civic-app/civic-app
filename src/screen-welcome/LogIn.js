import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native'

const LogIn = props => (
  <View style={styles.container}>
    <Text>Welcome! You are not logged in</Text>
    <Button title='Sign In' onPress={() => undefined}/>
    <CredentialInput onSubmit={props.onLogInSubmit} />
    <Button title='Register' onPress={() => undefined}/>
    <CredentialInput onSubmit={props.onRegisterSubmit} />
  </View>
)

LogIn.propTypes = {
  onLogInSubmit: PropTypes.func,
  onRegisterSubmit: PropTypes.func,
}

class CredentialInput extends React.Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      email: '',
      password: '',
    }
  }

  handleSubmit() {
    this.props.onSubmit(this.state.email, this.state.password)
  }
  render() {
    return (
      <View>
        <TextInput
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
          placeholder='email'
        />
        <TextInput
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          secureTextEntry={true}
          placeholder='password'
        />
        <Button onPress={this.handleSubmit} title='Submit' />
      </View>
    )
  }
}

CredentialInput.propTypes = {
  onSubmit: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default LogIn
