import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';

const WelcomeCarouselItem = props => {
  return (
    <View style={styles.container}>
      <View {...props} style={styles.badge}>
        {props.image}
      </View>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.subtitle}>{props.subtitle}</Text>
    </View>
  );
};

WelcomeCarouselItem.propTypes = {
  image: PropTypes.object,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    height: 280,
    width: 280,
    margin: 20,
    borderRadius: 140,
    backgroundColor: colors.offWhite,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  title: {
    color: colors.white,
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 24,
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
