import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

class FavoritesScreen extends React.Component {
  static navigationOptions = {
    title: 'My Favorites',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the Favorites Screen</Text>
      </View>
    );
  }
}

export default FavoritesScreen;
