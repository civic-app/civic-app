import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import colors from '../../styles/colors';

const Banner = props => {
  return (
    <View style={[styles.container, props.style, { backgroundColor: props.color }]}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.subtitle}>{props.subtitle}</Text>
      <Entypo name={props.icon} color={colors.white} size={60} style={styles.icon} />
    </View>
  );
};

Banner.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.object,
  subtitle: PropTypes.string,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignSelf: 'stretch',
    minHeight: 100,
    padding: 16,
    borderRadius: 2,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  icon: {
    opacity: 0.5,
    position: 'absolute',
    right: 20,
    bottom: 0,
  },
  title: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '500',
  },
  subtitle: {
    color: colors.white,
    fontSize: 18,
    marginTop: 4,
  },
});

export default Banner;
