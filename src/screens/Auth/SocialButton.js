import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import GoogleIcon from './GoogleIcon';
import colors from '../../styles/colors';

const SocialButton = props => {
  const config = (type => {
    switch (type) {
      case 'email':
        return {
          textColor: colors.black,
          icon: { name: 'email', type: 'material-community', color: colors.black, size: 35 },
        };
      case 'facebook':
        return {
          textColor: colors.white,
          icon: { name: 'facebook-box', type: 'material-community', size: 35 },
        };
      case 'google':
        return {
          textColor: colors.black,
          icon: {},
          iconComponent: GoogleIcon,
        };
    }
  })(props.type.toLowerCase());

  return (
    <Button
      borderRadius={3}
      buttonStyle={[styles.button, styles[props.type]]}
      color={config.textColor}
      containerViewStyle={props.style}
      fontSize={18}
      icon={config.icon}
      iconComponent={config.iconComponent}
      title={props.title}
      onPress={props.onPress}
      outline={true}
      textStyle={styles.textStyle}
    />
  );
};

SocialButton.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.any,
  title: PropTypes.string,
  type: PropTypes.oneOf(['google', 'facebook', 'email']),
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
  },
  // eslint-disable-next-line
  email: {
    backgroundColor: colors.white,
    borderColor: colors.lightGray2,
  },
  // eslint-disable-next-line
  facebook: {
    backgroundColor: colors.facebookBlue,
    borderColor: colors.facebookBlue,
  },
  // eslint-disable-next-line
  google: {
    backgroundColor: colors.white,
    borderColor: colors.lightGray2,
  },
  textStyle: {
    flex: 3,
  },
});

export default SocialButton;
