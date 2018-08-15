import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import CandidateDetail from './CandidateDetailContainer';
import PropTypes from 'prop-types';
import TabBar from './TabBar';

class CandidatesScreen extends React.Component {
  static navigationOptions = {
    title: 'Candidates',
  };
  static propTypes = propTypes;
  render() {
    return (
      <ScrollView style={styles.container}>
        <CandidateDetail candidateId={this.props.navigation.state.params.id}/>
        <TabBar/>
      </ScrollView>
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

export default CandidatesScreen;
