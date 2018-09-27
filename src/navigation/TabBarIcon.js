import React from 'react';
import { Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Entypo } from '@expo/vector-icons';

const electionsIconSource = require('../assets/images/elections-icon-gray.png');
const electionsIconHighlightedSource = require('../assets/images/elections-icon-orange.png');

const electionsIconStyle = StyleSheet.create({
  icon: {
    height: 25,
    width: 20,
  },
});

const ElectionsIcon = <Image source={electionsIconSource} style={electionsIconStyle.icon} />;
const ElectionsIconHighlighted = <Image source={electionsIconHighlightedSource} style={electionsIconStyle.icon} />;

const TabBarIcon = props => {
  const { routeName } = props.navigation.state;
  let iconName;
  switch (routeName) {
    case 'Home':
      iconName = 'home';
      break;
    case 'Elections':
      // return custom icon for elections
      if (props.focused) {
        return ElectionsIconHighlighted;
      }
      return ElectionsIcon;
    case 'Favorites':
      iconName = 'star';
      break;
    case 'Activism':
      iconName = 'megaphone';
      break;
    default:
      iconName = null;
  }
  return <Entypo name={iconName} size={25} color={props.tintColor} />;
};

TabBarIcon.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      routeName: PropTypes.string,
    }),
  }).isRequired,
  tintColor: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired,
};

export default TabBarIcon;
