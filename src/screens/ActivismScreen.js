import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

class ActivismScreen extends React.Component {
  static navigationOptions = {
    title: 'Activism',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the Activism Screen</Text>
      </View>
    );
  }
}

export default ActivismScreen;
