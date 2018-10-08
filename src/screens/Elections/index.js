import React from 'react';
import PropTypes from 'prop-types';
import Elections from './viewSelectors'

class ElectionsScreen extends React.Component {
  static navigationOptions = {
    title: 'Elections',
  };
  static propTypes = propTypes;
  goToCandidateDetail = (id) => () => this.props.navigation.navigate('CandidateDetail', { id });
  goToVoterRegistration = () => this.props.navigation.navigate('VoterReg');
  render() {
    return (
      <Elections goToCandidateDetail={this.goToCandidateDetail} goToVoterRegistration={this.goToVoterRegistration} {...this.props} />
    );
  }}

const propTypes = {
  navigation: PropTypes.objectOf({
    navigate: PropTypes.func,
    push: PropTypes.func,
  }),
};

export default ElectionsScreen;
