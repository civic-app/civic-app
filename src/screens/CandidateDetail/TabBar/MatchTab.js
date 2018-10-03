import React from 'react';
import { View, Text, StyleSheet, Share } from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../../../styles/colors';
import IssueCard from './IssueCard';
import ShareButton from '../../components/ShareButton';

const MatchCard = props => (
  <View style={styles.matchCard}>
    <Text style={styles.matchCardText}>
      You're a  <Text style={styles.matchCardPercentText}>{props.matchPercent}%</Text>  match!
    </Text>
    <ShareButton
      title={"Share"}
      buttonStyle={styles.buttonStyle}
      onPress={()=>{
        const url = "https://www.getcivicapp.com/";
        Share.share({
          message: `I'm a ${props.matchPercent} with ${'candidate name placeholder'}! Register to vote and find your election matches with Civic in 5 minutes.`,
          url: url,
          title: "Civic App"
        },
        {
          dialogTitle: "Civic App"
        })
      }}
    />
  </View>
);

MatchCard.propTypes = {
  matchPercent: PropTypes.number,
};

const MatchTab = props => {
  return (
    <View style={styles.container}>
      <MatchCard matchPercent={props.matchPercent} />
      {props.issueMatchData.map(({ id, ...rest }) => (
        <IssueCard key={id} {...rest} />
      ))}
    </View>
  );
};

MatchTab.propTypes = {
  matchPercent: PropTypes.number,
  issueMatchData: PropTypes.array,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  matchCard: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.darkBlue,
    borderRadius: 2,
    padding: 15,
    paddingLeft: 0,
    paddingRight: 0,
  },
  buttonStyle: {
    backgroundColor: Colors.lightBlue,
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  matchCardText: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.white,
    flex: 2,
    marginBottom: 5
  },
  matchCardPercentText:{
    fontSize: 24
  }
});

export default MatchTab;
