import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';

const TabBarLabel = props => {
  return <Text style={[styles.text, props.focused && {color: props.tintColor}]}>{props.title}</Text>;
};

TabBarLabel.propTypes = {
  tintColor: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: colors.darkGray,
    textAlign: 'center',
  },
});

export default TabBarLabel;
