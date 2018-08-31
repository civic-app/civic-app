import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import CandidateDetail from './CandidateDetail';
import { toggleFavorite } from '../../favorites/redux';
import TabBar from './TabBar';
import { getCandidateSummary, getTabBarProps } from './viewSelectors';


class CandidatesScreen extends React.Component {
  static navigationOptions = {
    title: 'Candidates',
  };
  static propTypes = propTypes;
  render() {
    return (
      <ScreenContainer candidateId={this.props.navigation.state.params.id} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  }
});

const propTypes = {
  navigation: PropTypes.objectOf({
    id: PropTypes.string,
  }),
};

const ScreenView = props => (
  <ScrollView style={styles.container}>
    <CandidateDetail summary={props.summary} toggleFavorite={props.toggleFavorite} />
    <TabBar {...props.tabBar} />
  </ScrollView>
);

ScreenView.propTypes = {
  summary: PropTypes.shape(CandidateDetail.proptypes),
  tabBar: PropTypes.shape(TabBar.propTypes),
};

const ScreenContainer = connect(
  (state, ownProps) => ({
    summary: getCandidateSummary(state, ownProps.candidateId),
    tabBar: getTabBarProps(state, ownProps.candidateId),
  }),
  { toggleFavorite },
)(ScreenView);

export default CandidatesScreen


