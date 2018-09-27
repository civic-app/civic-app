import React from 'react';
import PropTypes from 'prop-types';
import Colors from '../../styles/colors';
import { connect } from 'react-redux';
import {StyleSheet, ScrollView, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { getCandidateData } from './viewSelectors'
import DataContainer from './CandidateContainer'

const ElectionsScreen = props => {
  return (
    <View style={styles.container}>
      <FlatList
        data={props.elections.elections}
        keyExtractor={(item)=>item.electionIds}
        renderItem={({item})=> (
          <View key={item} style={styles.candidateContainer}>
            <View style={styles.informationContainer}>
              <Text style={styles.positionText}>{item.electionIds} </Text>
              <Text style={styles.electionText}>November 6, 2018</Text>
            </View>
            <ScrollView horizontal={true}>
              {item.candidates.map(candidate => { 
                return ( 
                  <TouchableOpacity key={candidate.id} onPress={ props.goToCandidateDetail(candidate.id)}>
                    <Candidate candidateId={candidate.id}/>
                  </TouchableOpacity>
                ) 
              })}
            </ScrollView>
          </View>
        )}
      />
    </View>
  );
}

ElectionsScreen.propTypes = {
  goToCandidateDetail: PropTypes.func,
  candidates: PropTypes.array,
  elections: PropTypes.object
};


export const Candidate = connect(
  (state, ownProps) => ({
    data: getCandidateData(state, ownProps.candidateId),
  }),
)(DataContainer);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent:'space-between',
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
    padding:20,
  },
  positionText : {
    fontSize : 20,
    fontWeight: 'bold',
  },
  electionText: {
    fontSize : 18,
  },
})
    
export default ElectionsScreen
