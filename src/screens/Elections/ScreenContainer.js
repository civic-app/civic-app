import React from 'react';
import PropTypes from 'prop-types';
import Colors from '../../styles/colors';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { getCandidateData } from './viewSelectors';
import DataContainer from './CandidateContainer';
import Banner from '../Home/Banner';
import VoterRegAlert from '../Home/VoterRegAlert';

const ElectionsScreen = props => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <VoterRegAlert
        isUserRegistered={props.isUserRegistered}
        onYesButtonPress={() => props.saveUserRegistered(true)}
        onNoButtonPress={props.goToVoterRegistration}
      />
      <Banner
        type="info"
        title="Here are your matches!"
        subtitle="Click to learn more about each candidate."
        icon="megaphone"
      />

      {props.electionCandidates.electionCandidates.map(item => {
        return (
          <View key={item.electionIds} style={styles.candidateContainer}>
            <View style={styles.informationContainer}>
              <Text style={styles.positionText}>{item.electionIds} </Text>
              <Text style={styles.electionText}>November 6, 2018</Text>
            </View>
            <ScrollView horizontal={true}>
              {item.candidates.map(candidate => {
                return (
                  <TouchableOpacity key={candidate.id} onPress={props.goToCandidateDetail(candidate.id)}>
                    <Candidate candidateId={candidate.id} />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        );
      })}
    </ScrollView>
  );
};

ElectionsScreen.propTypes = {
  goToCandidateDetail: PropTypes.func.isRequired,
  goToVoterRegistration: PropTypes.func.isRequired,
  electionCandidates: PropTypes.object.isRequired,
  isUserRegistered: PropTypes.bool.isRequired,
  saveUserRegistered: PropTypes.func.isRequired,
};

export const Candidate = connect((state, ownProps) => ({
  data: getCandidateData(state, ownProps.candidateId),
}))(DataContainer);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  candidateContainer: {
    alignItems: 'flex-start',
    marginTop: 15,
    flex: 1,
    paddingBottom: 15,
    backgroundColor: Colors.white,
  },
  informationContainer: {
    padding: 20,
  },
  positionText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  electionText: {
    fontSize: 18,
  },
});

export default ElectionsScreen;
