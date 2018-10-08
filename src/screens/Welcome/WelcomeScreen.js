import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, View } from 'react-native';
import colors from '../../styles/colors';
import WelcomeCarousel from './WelcomeCarousel';
import WelcomePanel from './WelcomePanel';

const civicLogoIcon = require('../../assets/images/civic-logo-white.png');

const WelcomeScreen = props => {
  return (
    <View style={styles.container}>
      <View></View>
      <View style={styles.mastheadContainer}>
        <Image style={styles.civicLogo} source={civicLogoIcon} />
        <WelcomeCarousel isSmallScreen={props.isSmallScreen} />
      </View>
      <View></View>
      <WelcomePanel
        formType={props.formType}
        switchFormType={props.changeFormType}
        navigate={props.navigation.navigate}
      />
    </View>
  );
};

WelcomeScreen.propTypes = {
  formType: PropTypes.string.isRequired,
  isSmallScreen: PropTypes.bool.isRequired,
  changeFormType: PropTypes.func.isRequired,
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.lightBlue,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  mastheadContainer: {
    alignItems: 'center',
  },
  civicLogo: {
    height: 65,
    width: 178,
    marginBottom: 10,
  },
});

export default WelcomeScreen;
