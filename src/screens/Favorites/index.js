import React from 'react';
import Favorites from './FavoritesPreviewContainer';

class FavoritesScreen extends React.Component {
  static navigationOptions = { title: 'My Favorites' };

  goToCandidateDetail = (id) => () => this.props.navigation.navigate('CandidateDetail', { id });

  render() {
    return <Favorites goToCandidateDetail={this.goToCandidateDetail} {...this.props} />;
  }
}

export default FavoritesScreen;
