import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { googleLogin } from '../../auth/redux/userReducer';
import GoogleIcon from './GoogleIcon';
import SocialButton from './SocialButton';
import colors from '../../styles/colors';

const GoogleAuthButton = props => (
  <SocialButton
    textColor={colors.black}
    icon={{}}
    style={props.style}
    buttonStyle={styles.button}
    onPress={props.onPress}
    title={props.title}
    iconComponent={GoogleIcon}
  />
);

GoogleAuthButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  style: SocialButton.propTypes.style,
};

GoogleAuthButton.defaultProps = {
  style: {},
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.white,
    borderColor: colors.lightGray2,
  },
});

const mapDispatchToProps = {
  onPress: googleLogin,
};

export default connect(
  null,
  mapDispatchToProps,
)(GoogleAuthButton);
