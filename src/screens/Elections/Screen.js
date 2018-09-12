import React from 'react';
import PropTypes from 'prop-types';
import { Button, View } from 'react-native';
import styles from '../styles';

const ElectionsScreen = props => (
  <View style={styles.container}>
    {console.log('hello',props)}
  </View>
);

ElectionsScreen.propTypes = {
  goToCandidateDetail: PropTypes.func,
  candidate: PropTypes.array,
  data:PropTypes.array,
};

export default ElectionsScreen
