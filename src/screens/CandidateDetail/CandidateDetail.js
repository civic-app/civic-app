import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import Colors from '../../styles/colors';
import { Category } from '../../favorites/models';

const CandidateDetail = props => (
  <View style={styles.container}>
    {props.summary
      ? <CandidatePreview
        {...props.summary}
        onToggleFavorite={() => props.toggleFavorite(props.candidateId, Category.Candidates)}
      />
      : <Text>Loading...</Text>
    }
  </View>
);

CandidateDetail.propTypes = {
  summary: PropTypes.object,
  toggleFavorite: PropTypes.func,
  positions: PropTypes.array,
  candidateId: PropTypes.string,
  partyPreference: PropTypes.string,
  matchPercent: PropTypes.number
};

const CandidatePreview = props => {
  const matchPercent = 98;
  const partyPreference = 'Democrat';
  const positions = ['President of the United States'];
  return(
    <View style={styles.previewContainer}>
      <View style={styles.container}>
        <Avatar xlarge rounded source={{ uri: props.imageURI }} />
        <Text style={styles.nameText}>{props.name}</Text>
        <Text style={styles.positionsText}>Running for {positions[0]}</Text>
        <Text>
          <Text style={styles.matchText}>{matchPercent}% </Text>
          match | {partyPreference}
        </Text>
      </View>
      <Favorite
        isFavorite={props.isFavorite}
        onToggleFavorite={props.onToggleFavorite}
      />
    </View>
  )
};

CandidatePreview.propTypes = {
  name: PropTypes.string,
  imageURI: PropTypes.string,
  isFavorite: PropTypes.bool,
  partyPreference: PropTypes.string,
  onToggleFavorite: PropTypes.func,
};

const Favorite = props => (
  <View style={styles.favoriteContainer}>
    <Icon
      name={props.isFavorite ? 'star' : 'star-border'}
      onPress={() => props.onToggleFavorite()}
      iconStyle={styles.favorite}
      size={40}
    />
  </View>
);

Favorite.propTypes = {
  isFavorite: PropTypes.bool,
  onToggleFavorite: PropTypes.func,
};

const styles = StyleSheet.create({
  previewContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  favorite: {
    color: Colors.orange
  },
  favoriteContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  nameText: {
    fontSize: 21,
    paddingTop: 5,
    fontWeight: 'bold'
  },
  positionsText: {
    color: Colors.lightGray,
    paddingTop: 5,
    paddingBottom: 5
  },
  matchText: {
    color: Colors.lightBlue,
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default CandidateDetail;
