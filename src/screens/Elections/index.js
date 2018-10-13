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
  goToSurvey = () => this.props.navigation.navigate('Survey');
  render() {
    return (
      <Elections
        goToCandidateDetail={this.goToCandidateDetail} goToVoterRegistration={this.goToVoterRegistration}
        goToSurvey={this.goToSurvey}
        {...this.props}
      />
    );
  }}

const propTypes = {
  navigation: PropTypes.objectOf({
    navigate: PropTypes.func,
    push: PropTypes.func,
  }),
};

export default ElectionsScreen;
