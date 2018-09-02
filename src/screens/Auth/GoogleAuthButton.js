import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { googleLogin } from '../../auth/redux';
import { getIsLoading } from '../../UI/redux';
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

GoogleAuthButton.defaultProps = { style: {} };

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.white,
    borderColor: colors.lightGray2,
  },
});

const mapStateToProps = state => ({ isLoading: getIsLoading(state) });

const mapDispatchToProps = { onPress: googleLogin };

// Prevent monkey clicking the button by disabling the onPress
// method if there's already an in-flight request
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  onPress: () => !stateProps.isLoading && dispatchProps.onPress(),
  ...ownProps,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(GoogleAuthButton);
