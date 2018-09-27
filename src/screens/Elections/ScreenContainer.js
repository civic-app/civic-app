import React from 'react';
import PropTypes from 'prop-types';
import Colors from '../../styles/colors';
import { connect } from 'react-redux';
import {StyleSheet, ScrollView, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { getCandidateData } from './viewSelectors'
import Candidate from './CandidateContainer'

var unique = (arrA) => {
  return arrA.filter((elem, pos, arr) => {
    return arr.indexOf(elem) == pos
  })
}
const distinctPositions = new Array()
const ElectionsScreen = props => {
  return (
    <View style={styles.container}>
      {props.candidates.map(candidate => {
        distinctPositions.push(candidate.electionIds[0])
      })} 
      <FlatList
        data={unique(distinctPositions)}
        keyExtractor={(item)=>item}
        renderItem={({item})=> (
          <View key={item} style={styles.candidateContainer}>
            <View style={styles.informationContainer}>
              <Text style={styles.positionText}>{item} </Text>
              <Text style={styles.electionText}>November 6, 2018</Text>
            </View>
            <ScrollView horizontal={true}>
              {props.candidates.map(candidate => (
                (item === candidate.electionIds.toString())
                  ?
                  <View key={candidate.id}>
                    <TouchableOpacity onPress={() => props.goToCandidateDetail(candidate.id)}> 
                      <Data candidateId={candidate.id}/>
                    </TouchableOpacity>
                  </View>
                  :
                  null
              ))}
            </ScrollView>
          </View>
        )}/>
    </View>
  );
}

ElectionsScreen.propTypes = {
  goToCandidateDetail: PropTypes.func,
  candidates: PropTypes.array
};

export const Data = connect(
  (state, ownProps) => ({
    data: getCandidateData(state, ownProps.candidateId),
  }),
)(Candidate);

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
