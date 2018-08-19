import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { getIsLoggedIn, loginSuccess, logOutSuccess } from '../auth/redux';
import firebase, { auth, provider } from '../firebase/initialize';
import styles from './styles';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  gotToWelcome() {
      this.props.navigation.navigate('Welcome');
  }

  logout = () => {
      firebase.auth().signOut()
          .then(() => {
              this.setState({
                  user: null
              });
              this.props.onLogOut();
              this.gotToWelcome();
          });
  }

  render() {
    return (
      <View style={styles.container}>
            <Text>This is the Home Screen</Text>
            <Button title="Log Out" onPress={() => this.logout()} />
      </View>
    );
  }
}

export default connect(
    (state) => ({ isLoggedIn: getIsLoggedIn(state) }),
    { onLogIn: loginSuccess, onLogOut: logOutSuccess },
)(HomeScreen);
