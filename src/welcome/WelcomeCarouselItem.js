import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';

const WelcomeCarouselItem = props => {
  return (
    <View style={stylesSmallScreen.container}>
      <View style={stylesSmallScreen.badge}>{props.image}</View>
      <Text style={stylesSmallScreen.title}>{props.title}</Text>
    </View>
  );
};

WelcomeCarouselItem.propTypes = {
  image: PropTypes.object,
  title: PropTypes.string,
};

// const stylesLargeScreen = StyleSheet.create({});

const stylesSmallScreen = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  badge: {
    height: 250,
    width: 250,
    marginTop: 24,
    borderRadius: 125,
    backgroundColor: colors.offWhite,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  title: {
    color: colors.white,
    fontSize: 20,
    textAlign: 'center',
    marginTop: 24,
  },
});

export default WelcomeCarouselItem;
