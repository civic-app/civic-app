import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';

const WelcomeCarouselItem = props => {
  return (
    <View style={styles.container}>
      <View style={styles.badge}>{props.image}</View>
      <Text style={styles.title}>{props.title}</Text>
      {!props.isSmallScreen && <Text style={styles.subtitle}>{props.subtitle}</Text>}
    </View>
  );
};

WelcomeCarouselItem.propTypes = {
  image: PropTypes.object,
  isSmallScreen: PropTypes.bool,
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

const styles = StyleSheet.create({
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
  subtitle: {
    color: colors.white,
    fontSize: 16,
    lineHeight: 24,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center',
  },
  title: {
    color: colors.white,
    fontSize: 20,
    textAlign: 'center',
    marginTop: 24,
  },
});

export default WelcomeCarouselItem;
