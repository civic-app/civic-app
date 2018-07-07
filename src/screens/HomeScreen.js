import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the Home Screen</Text>
      </View>
    );
  }
}

export default HomeScreen;
