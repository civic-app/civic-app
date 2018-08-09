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
};

const CandidatePreview = props => (
  <View style={styles.previewContainer}>
    <View style={styles.container}>
      <Avatar xlarge rounded source={{ uri: props.imageURI }} />
      <Text>{props.name}</Text>
      <Text>{props.partyPreference}</Text>
    </View>
    <Favorite
      isFavorite={props.isFavorite}
      onToggleFavorite={props.onToggleFavorite}
    />
  </View>
);

CandidatePreview.propTypes = {
  name: PropTypes.string,
  imageURI: PropTypes.string,
  isFavorite: PropTypes.bool,
  partyPreference: PropTypes.string,
  onToggleFavorite: PropTypes.func,
};

const Favorite = props => (
  <View styles={styles.favorite}>
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
    marginBottom: 10,
    padding: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  favorite: {
    color: Colors.orange,
  },
});

export default CandidateDetail;
