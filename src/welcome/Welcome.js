import React from 'react';
import { StyleSheet, View } from 'react-native';
import WelcomeCarousel from './WelcomeCarousel';

const Welcome = () => (
  <View style={styles.container}>
    <WelcomeCarousel />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Welcome;
