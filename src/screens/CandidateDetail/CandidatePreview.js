import React from 'react';
import PropTypes from 'prop-types';
import {View,Text } from 'react-native';
import styles from '../styles';
import { Avatar } from 'react-native-elements';

const FavoritesScreen = props =>(
  <View style={styles.container}>
    {props.candidates.map(candidate => (
      <View style={styles.container} key={candidate.id}>
        <Avatar xlarge rounded source={{ uri: candidate.image}}/>
        <Text >{candidate.name}</Text>
      </View>
    ))}   

  </View>);

FavoritesScreen.propTypes = {
  goToCandidateDetail: PropTypes.func,
  candidates: PropTypes.array
};

export default FavoritesScreen;
