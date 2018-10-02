import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import DistrictMatch from './DistrictMatchContainer';

const DistrictMatchScreen = (props) => {
  return (
    <KeyboardAvoidingView style={styles.keyboardAvoidView} behavior="position">
      <DistrictMatch navigate={props.navigation.navigate}/>
    </KeyboardAvoidingView>
  );
};

DistrictMatchScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

const styles = StyleSheet.create({
  keyboardAvoidView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  }
})

export default DistrictMatchScreen;
