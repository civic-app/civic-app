import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import colors from '../styles/colors';
import WelcomeCarousel from './WelcomeCarousel';
import WelcomePanel from './WelcomePanel';

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.civicLogo} source={require('../assets/images/civic-logo-white.png')} />
      <WelcomeCarousel />
      <WelcomePanel />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  civicLogo: {
    height: 65,
    width: 178,
    marginTop: 20,
  },
});

export default WelcomeScreen;
