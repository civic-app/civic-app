import React from 'react';
import { View, Text, StyleSheet, Share } from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../../../styles/colors';
import ShareButton from '../../components/ShareButton';
import IssueCard from './IssueCard';

const MatchTab = ({ issueMatchData, ...props}) => {
  return (
    <View style={styles.container}>
      <MatchCard {...props} />
      <PartialMatchMessage {...props} />
      {issueMatchData.map(({ id, ...rest }) => (
        <IssueCard key={id} navigation={props.navigation} {...rest} />
      ))}
    </View>
  );
};

MatchTab.propTypes = {
  matchPercent: PropTypes.number,
  issueMatchData: PropTypes.array,
  shouldShowMatch: PropTypes.bool,
  known: PropTypes.number,
  total: PropTypes.number,
  candidateName: PropTypes.string,
};

const MatchCard = props => (
  <View style={styles.matchCard}>
    {props.shouldShowMatch
      ? <Text style={styles.matchCardText}>
        {`You're a `}<Text style={styles.matchCardPercentText}>{props.matchPercent}%</Text>  match!
      </Text>
      : <Text style={styles.matchCardText}>No match calculated</Text>
    }
    <ShareButton
      title={'Share'}
      buttonStyle={styles.buttonStyle}
      onPress={()=>{
        const url = 'https://www.getcivicapp.com/';
        Share.share({
          message: toMessage(props.matchPercent, props.shouldShowMatch, props.candidateName),
          url: url,
          title: 'Civic App'
        },
        {
          dialogTitle: 'Civic App'
        })
      }}
    />
  </View>
);

const toMessage = (match, shouldShow, name) =>
  shouldShow
    ? `I'm a ${match} with ${name}! Register to vote and find your election matches with Civic in 5 minutes.`
    : `I'm finding out what ${name} thinks about issues I care about!` +
      ' Register to vote and find your election matches with Civic in 5 minutes.';

MatchCard.propTypes = {
  matchPercent: PropTypes.number,
  shouldShowMatch: PropTypes.bool,
  candidateName: PropTypes.string,
};

const PartialMatchMessage = props =>
  props.known < props.total
    ? <Text style={styles.partialMatchMessage}>
      Info for {props.known}/{props.total} issues you care about - {props.shouldShowMatch ? 'partial': 'no'} match calculated
    </Text>
    : null;

PartialMatchMessage.propTypes = {
  shouldShowMatch: PropTypes.bool,
  known: PropTypes.number,
  total: PropTypes.number,
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
  matchCardPercentText: {
    fontSize: 24
  },
  partialMatchMessage: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: 'center',
    paddingBottom: 5,
  },
});

export default MatchTab;
