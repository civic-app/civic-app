import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';

const CandidateDetail = props => (
  <View style={styles.container}>
    <CandidateSummary
      {...props.summary}
      onToggleFavorite={props.toggleFavorite}
    />
  </View>
);

CandidateDetail.propTypes = {
  summary: PropTypes.object,
  toggleFavorite: PropTypes.func,
  positions: PropTypes.array,
};

const CandidateSummary = props => (
  <View>
    <Favorite
      isFavorite={props.isFavorite}
      onToggleFavorite={props.onToggleFavorite}
    />
    <Avatar xlarge rounded source={{ uri: props.imageURI }} />
    <Text>{props.name}</Text>
    <Text>{props.partyPreference}</Text>
  </View>
);

CandidateSummary.propTypes = {
  name: PropTypes.string,
  imageURI: PropTypes.string,
  isFavorite: PropTypes.bool,
  partyPreference: PropTypes.string,
  onToggleFavorite: PropTypes.func,
};

const Favorite = props => (
  <View styles={styles.favorite}>
    <Icon
      name={props.isFavorite ? 'star' : 'star-outlined'}
      onPress={props.onToggleFavorite}
      iconStyle={styles.favorite}
    />
  </View>
);

Favorite.propTypes = {
  isFavorite: PropTypes.bool,
  onToggleFavorite: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    padding: 20,
  },
  favorite: {
    position: 'absolute',
    right: '1%',
    top: '1%',
  },
});

export default CandidateDetail;
