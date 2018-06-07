import React from 'react'
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import { getCurrentUserId, logIn, register, logOut } from '../auth/api'

// TODO: hook up reducers, sagas, etc - this is just to make sure firebaes is working
class Placeholder extends React.Component {

  constructor() {
    super()
    this.state = { isLoggedIn: false }
  }

  componentDidMount() {
    Promise.resolve(getCurrentUserId()).then(id => this.setState({isLoggedIn: !!id}))
  }

  handleLogInClick(email, password) {
    logIn(email, password)
  }

  handleLogOutClick() {
    logOut()
  }

  handleRegisterClick(email, password) {
    console.log('registering', register.toString())
    register(email, password)
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to Civic App!</Text>
        <Text>You are {this.state.isLoggedIn ? ' ' : ' not '} logged in</Text>
        {this.state.isLoggedIn && (
          <Button title='Log out' onPress={this.handleLogOutClick}/>
        )}
        {!this.state.isLoggedIn && (
          <View>
            <Button title='Log in' onPress={() => undefined}/>
            <CredentialInput onSubmit={this.handleLogInClick} />
          </View>
        )}
        {!this.state.isLoggedIn && (
          <View>
            <Button title='Register' onPress={() => undefined}/>
            <CredentialInput onSubmit={this.handleRegisterClick} />
          </View>
        )}
      </View>
    )
  }
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

export default Placeholder
