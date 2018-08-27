import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styles from './styles';
import CandidatePreview from '../screens/CandidateDetail/CandidatePreviewContainer';

class FavoritesScreen extends React.Component {
  static navigationOptions = {
    title: 'My Favorites',
  };
  static propTypes = propTypes;
  goToCandidateDetail = (id) => () => this.props.navigation.navigate('CandidateDetail', { id });
  render() {
    return (
      <View style={styles.container}>
        <CandidatePreview goToCandidateDetail={this.goToCandidateDetail}/>
      </View>
    );
  }
}

const propTypes = {
  navigation: PropTypes.objectOf({
    goToCandidateDetail: PropTypes.func,
    id: PropTypes.string,
    navigate: PropTypes.func,
    push: PropTypes.func,
  }),
};

export default FavoritesScreen;
