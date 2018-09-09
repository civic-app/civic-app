import React from 'react';
import PropTypes from 'prop-types';
import Screen from './ScreenContainer';

class ElectionsScreen extends React.Component {
  static navigationOptions = {
    title: 'Elections',
  };
  static propTypes = propTypes;

  goToCandidateDetail = (id) => () => this.props.navigation.navigate('CandidateDetail', { id });

  render() {
    return <Screen goToCandidateDetail={this.goToCandidateDetail} {...this.props} />;
  }
}

const propTypes = {
  navigation: PropTypes.objectOf({
    navigate: PropTypes.func,
    push: PropTypes.func,
  }),
};

export default ElectionsScreen;
