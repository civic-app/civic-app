import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

class ElectionsScreen extends React.Component {
  static navigationOptions = {
    title: 'Elections',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the Elections Screen</Text>
      </View>
    );
  }
}

export default ElectionsScreen;
