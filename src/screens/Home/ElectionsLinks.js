import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import colors from '../../styles/colors';

const ElectionsLinks = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Something?</Text>
      <View style={styles.buttonGroup}>
        <Button
          buttonStyle={styles.button}
          containerViewStyle={styles.buttonContainer}
          borderRadius={3}
          textStyle={styles.buttonText}
          title="Registration"
          onPress={props.onRegisterButtonPress}
        />
        <Button
          buttonStyle={styles.button}
          containerViewStyle={styles.buttonContainer}
          borderRadius={3}
          textStyle={styles.buttonText}
          title="Retake Survey"
          onPress={props.onSurveyButtonPress}
        />
      </View>
    </View>
  )
};

ElectionsLinks.propTypes = {
  onRegisterButtonPress: PropTypes.func.isRequired,
  onSurveyButtonPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: colors.darkBlue,
    paddingTop: 10,
    borderRadius: 3,
    elevation: 2,
    shadowColor:colors.black,
    shadowOffset: {
      width: 2, height: 2
    },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    margin: 10,
  },
  title: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
  },
  buttonGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonContainer: {
    flex: 1,
    elevation: 2,
    borderRadius: 3,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    marginBottom: 20,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  button: {
    backgroundColor: colors.white,
  },
  buttonText: {
    color: colors.black,
  },
});

export default ElectionsLinks;
