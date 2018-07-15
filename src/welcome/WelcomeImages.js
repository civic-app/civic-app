import React from 'react';
import { Image, StyleSheet } from 'react-native';

export const CandidatesImage = props => (
  <Image
    {...props}
    style={styles.candidates}
    source={require('../assets/images/welcome-candidates-icon.png')}
  />
);

export const StayInformedImage = props => (
  <Image
    {...props}
    style={styles.stayInformed}
    source={require('../assets/images/welcome-stay-informed-icon.png')}
  />
);

export const GetInvolvedImage = props => (
  <Image
    {...props}
    style={styles.getInvolved}
    source={require('../assets/images/welcome-get-involed-icon.png')}
  />
);

export const GoogleIcon = props => (
  <Image
    {...props}
    style={styles.social}
    source={require('../assets/images/google-icon.png')}
  />
);
const styles = StyleSheet.create({
  candidates: {
    height: 138,
    width: 138,
  },
  stayInformed: {
    height: 148,
    width: 110,
  },
  getInvolved: {
    height: 144,
    width: 180,
  },
  social: {
    height: 10,
    width: 10,
  },
});
