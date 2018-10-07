import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import colors from '../../styles/colors';

const SocialButton = props => (
  <Button
    borderRadius={3}
    buttonStyle={[styles.button, props.buttonStyle]}
    color={props.textColor}
    containerViewStyle={props.style}
    fontSize={16}
    icon={props.icon}
    iconComponent={props.iconComponent}
    title={props.title}
    onPress={props.onPress}
    outline
    textStyle={styles.textStyle}
  />
);

SocialButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.number,
  }),
  textColor: PropTypes.string,
  iconComponent: PropTypes.func,
  style: Button.propTypes.containerViewStyle,
  buttonStyle: Button.propTypes.buttonStyle,
};

SocialButton.defaultProps = {
  textColor: colors.black,
  icon: {
    name: 'email',
    type: 'material-community',
    color: colors.black,
    size: 32,
  },
  iconComponent: null,
  style: {},
  buttonStyle: {},
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    backgroundColor: colors.white,
    borderColor: colors.lightGray2,
  },
  textStyle: {
    flex: 3,
  },
});

export default SocialButton;
