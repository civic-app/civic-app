import React from 'react';
import PropTypes from 'prop-types';
import { Entypo } from '@expo/vector-icons';

const TabBarIcon = props => {
  const { routeName } = props.navigation.state;
  let iconName;
  switch (routeName) {
    case 'Home':
      iconName = 'home';
      break;
    case 'Elections':
      iconName = 'documents';
      break;
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
  }),
  tintColor: PropTypes.string,
};

export default TabBarIcon;
