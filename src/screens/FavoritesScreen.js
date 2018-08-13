import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styles from './styles';
import CandidatePreview from '../screens/CandidateDetail/CandidatePreviewContainer';
// import Screen from '../favorites/FavoritesContainer'

class FavoritesScreen extends React.Component {
  static navigationOptions = {
    title: 'My Favorites',
  };
  static propTypes = propTypes;

  goToCandidateDetail = (id) => () => this.props.navigation.navigate('CandidateDetail', { id });

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the Favorites Screen</Text>
        <CandidatePreview goToCandidateDetail={this.goToCandidateDetail} />
      </View>
    );
  }
}

const propTypes = {
  navigation: PropTypes.objectOf({
    goToCandidateDetail: PropTypes.func,
    id: PropTypes.string,
    isFavorite: PropTypes.bool,
    candidates: PropTypes.array,
    navigate: PropTypes.func,
    push: PropTypes.func,
  }),
};

export default FavoritesScreen;
