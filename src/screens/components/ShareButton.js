import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import Colors from '../../styles/colors';

const ShareButton = props => (
  <Button
    raised
    rightIcon={{name: 'launch', size:20}}
    borderRadius={5}
    title={props.title}
    buttonStyle={props.buttonStyle}
    containerViewStyle={props.containerViewStyle}
    textStyle={styles.buttonText}
    onPress={props.onPress}
  />
);

ShareButton.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func
};

const styles = StyleSheet.create({
  buttonText: {
    color: Colors.white,
    fontSize: 14
  }
});

export default ShareButton;
