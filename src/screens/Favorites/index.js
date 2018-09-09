import React from 'react';
import Favorites from './FavoritesPreviewContainer';

class FavoritesScreen extends React.Component {
  static navigationOptions = { title: 'My Favorites' };

  render() {
    return <Favorites {...this.props} />;
  }
}

export default FavoritesScreen;
