import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styles from './styles';
import Screen from '../screens/Elections/ScreenContainer';
// import Screen from '../favorites/FavoritesContainer'

class FavoritesScreen extends React.Component {
  static navigationOptions = {
    title: 'My Favorites',
  };
  static propTypes = propTypes;

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the Favorites Screen</Text>
        <Screen favorites={console.log(this.props.navigation)} />
      </View>
    );
  }
}

const propTypes = {
  navigation: PropTypes.objectOf({
    id: PropTypes.func,
  }),
};

export default FavoritesScreen;
