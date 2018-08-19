import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'
import Colors from '../../../styles/colors';
import IssueCard from './IssueCard';

const issueMatchData = [
  {
    id: '1',
    type:'healthcare',
    body:'Obama supports single-payer universal healthcare for all Californians.',
    agreesWithUser: true
  },
  {
    id: '2',
    type:'environmental',
    body:'Obama does not support solar power.',
    agreesWithUser: false
  },
];


const MatchCard = () =>
  <View style={styles.matchCard}>
    <Text style={styles.matchCardText}>You're a <Text style={styles.matchCardPercentText}>98%</Text> match!</Text>
    <Button
      raised
      rightIcon={{name: 'launch', size:25}}
      borderRadius={5}
      title="Share"
      buttonStyle={styles.shareButton}
      containerViewStyle={styles.buttonView}
      textStyle={styles.buttonText}
      fontWeight="bold"
    />
  </View>

const MatchTab = () => {
  return (
    <View style={styles.container}>
      <MatchCard />
      {
        issueMatchData.map(({id, ...rest}) =>
          <IssueCard key={id} {...rest} />
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  matchCard:{
    margin:10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.darkBlue,
    borderRadius: 2,
    height:62
  },
  matchCardText: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.white,
    flex:2
  },
  matchCardPercentText:{
    fontSize: 24
  },
  shareButton: {
    backgroundColor: Colors.lightBlue,
    height: '60%'
  },
  buttonView: {
    width: '33%',
  },
  buttonText: {
    color: Colors.white
  }
});

export default MatchTab;
