import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, View } from 'react-native';
import colors from '../styles/colors';
import WelcomeCarousel from './WelcomeCarousel';
import WelcomePanel from './WelcomePanel';

const WelcomeScreen = props => {
  return (
    <View style={styles.container}>
      <Image style={styles.civicLogo} source={require('../assets/images/civic-logo-white.png')} />
      <WelcomeCarousel />
      <WelcomePanel onButtonPress={() => props.navigation.navigate('Credentials')} />
    </View>
  );
};

WelcomeScreen.propTypes = {
  navigation: PropTypes.objectOf({
    navigate: PropTypes.func,
    push: PropTypes.func,
  }),
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
