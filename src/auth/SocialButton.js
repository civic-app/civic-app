import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import colors from '../styles/colors';

const GoogleIcon = props => (
  <View style={styles.iconContainer}>
    <Image
      {...props}
      source={require('../assets/images/google-icon.png')}
      style={styles.googleIcon}
    />
  </View>
);

const FacebookIcon = props => (
  <View style={styles.iconContainer}>
    <Image
      {...props}
      source={require('../assets/images/facebook-icon.png')}
      style={styles.facebookIcon}
    />
  </View>
);

const SocialButton = props => {
  const config = (type => {
    switch (type) {
      case 'email':
        return {
          textColor: colors.black,
          icon: 'email',
        };
      case 'facebook':
        return {
          textColor: colors.white,
          icon: FacebookIcon,
        };
      case 'google':
        return {
          textColor: colors.black,
          icon: GoogleIcon,
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
      icon={{ name: config.icon }}
      iconComponent={config.icon}
      title={props.title}
      onPress={props.onPress}
      outline={true}
      textStyle={styles.textStyle}
    />
  );
};

SocialButton.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.object,
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
  facebookIcon: {
    height: 35,
    width: 35,
  },
  // eslint-disable-next-line
  google: {
    backgroundColor: colors.white,
    borderColor: colors.lightGray2,
  },
  googleIcon: {
    height: 32,
    width: 32,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    flex: 3,
  },
});

export default SocialButton;
