import React from 'react';
import PropTypes from 'prop-types';
import Elections from './viewSelectors'

class ElectionsScreen extends React.Component {
  static navigationOptions = {
    title: 'Elections',
  };
  goToCandidateDetail = (id) => () => this.props.navigation.navigate('CandidateDetail', { id });
  static propTypes = propTypes;
  render() {
    return <Elections goToCandidateDetail={this.goToCandidateDetail} {...this.props} />;
  }
}

const propTypes = {
  navigation: PropTypes.objectOf({
    navigate: PropTypes.func,
    push: PropTypes.func,
  }),
};

export default ElectionsScreen;
