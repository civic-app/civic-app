import React from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SocialButton from './SocialButton';
import colors from '../../styles/colors';
import { facebookLogin } from '../../auth/redux/userReducer';
import { getIsLoading } from '../../auth/redux/selectors';

const FacebookAuthButton = (props) => {
  const textColor = colors.white;
  const icon = { name: 'facebook-box', type: 'material-community', size: 35 };
  return (
    <SocialButton
      textColor={textColor}
      icon={icon}
      style={props.style}
      buttonStyle={styles.button}
      onPress={props.onPress}
      title={props.title}
    />
  );
};

FacebookAuthButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  style: SocialButton.propTypes.style,
};

FacebookAuthButton.defaultProps = { style: {} };

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.facebookBlue,
    borderColor: colors.facebookBlue,
  },
});

const mapStateToProps = state => ({ isLoading: getIsLoading(state) });

const mapDispatchToProps = { onPress: facebookLogin };

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
)(FacebookAuthButton);
