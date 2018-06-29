import React from 'react'
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Button } from 'react-native'
import LogIn from './LogIn'

const Welcome = props => (
  <View style={styles.container}>
    {props.isLoggedIn
      ? <LoggedInPlaceholder onLogOutClick={props.logOut} />
      : <LogIn onLogInSubmit={props.logIn} onRegisterSubmit={props.register} />
    }
  </View>
)

Welcome.propTypes = {
  isLoggedIn: PropTypes.bool,
  logOut: PropTypes.func,
  logIn: PropTypes.func,
  register: PropTypes.func,
}

const LoggedInPlaceholder = props => (
  <View>
    <Text>Welcome! You are logged in!</Text>
    <Button title='Log out' onPress={props.onLogOutClick}/>
  </View>
)

LoggedInPlaceholder.propTypes = {
  onLogOutClick: PropTypes.func,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Welcome
