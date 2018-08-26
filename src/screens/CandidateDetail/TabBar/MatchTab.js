import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'
import PropTypes from 'prop-types';
import Colors from '../../../styles/colors';
import IssueCard from './IssueCard';

const MatchCard = props =>
  <View style={styles.matchCard}>
    <Text style={styles.matchCardText}>
      You're a <Text style={styles.matchCardPercentText}>{props.matchPercent}%</Text> match!
    </Text>
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

MatchCard.propTypes = {
  matchPercent: PropTypes.number,
};

const MatchTab = props => {
  return (
    <View style={styles.container}>
      <MatchCard matchPercent={props.matchPercent} />
      {
        props.issueMatchData.map(({id, ...rest}) =>
          <IssueCard key={id} {...rest} />
        )
      }
    </View>
  );
};

MatchTab.propTypes = {
  matchPercent: PropTypes.number,
  issueMatchData: PropTypes.array,
};

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
    height:70
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
  },
  buttonView: {
    width: '33%',
    height: '60%',
  },
  buttonText: {
    color: Colors.white
  }
});

export default MatchTab;
