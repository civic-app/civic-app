import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';

const WelcomeCarouselItem = props => {
  return (
    <View style={stylesSmallScreen.container}>
      <View {...props} style={stylesSmallScreen.badge}>
        {props.image}
      </View>
      <Text style={stylesSmallScreen.title}>{props.title}</Text>
      <Text style={stylesSmallScreen.subtitle}>{props.subtitle}</Text>
    </View>
  );
};

WelcomeCarouselItem.propTypes = {
  image: PropTypes.object,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

// const stylesLargeScreen = StyleSheet.create({});

const stylesSmallScreen = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  badge: {
    height: 250,
    width: 250,
    marginTop: 20,
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
    paddingTop: 20,
    paddingBottom: 8,
  },
  subtitle: {
    color: colors.white,
    fontSize: 16,
    lineHeight: 24,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center',
  },
});

export default WelcomeCarouselItem;
