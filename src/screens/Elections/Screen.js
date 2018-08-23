import React from 'react';
import PropTypes from 'prop-types';
import { Button, View } from 'react-native';
import styles from '../styles';

const ElectionsScreen = props => (
  <View style={styles.container}>
    {props.candidates.map(candidate => (
      <Button
        key={candidate.id}
        title={`View Candidate Detail for ${candidate.name}`}
        onPress={props.goToCandidateDetail(candidate.id)}
      />
    ))}
  </View>
)

ElectionsScreen.propTypes = {
  goToCandidateDetail: PropTypes.func,
  candidates: PropTypes.array
}

export default ElectionsScreen
