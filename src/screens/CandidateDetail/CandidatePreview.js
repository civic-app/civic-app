import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity,View,Text } from 'react-native';
import styles from '../styles';
import { Avatar } from 'react-native-elements';

const FavoritesScreen = props =>(
  <View style={styles.container}>
    {props.candidates.map(candidate => (
      <View style={styles.container} key={candidate.id}>
        <TouchableOpacity onPress={props.goToCandidateDetail(candidate.id)}>
          <Avatar xlarge rounded source={{ uri: candidate.image}}/>
        </TouchableOpacity>
        <Text style={styles.nameText} >{candidate.name}</Text>
      </View>
    ))}

  </View>);

FavoritesScreen.propTypes = {
  candidates: PropTypes.array,
  favorites: PropTypes.bool,
  name: PropTypes.string,
  imageURI: PropTypes.string,
  goToCandidateDetail: PropTypes.func,
};

export default FavoritesScreen;
