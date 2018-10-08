import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import colors from '../../styles/colors';

const VoterRegAlert = props => {
  return props.isUserRegistered ? null : (
    <View style={styles.container}>
      <Text style={styles.title}>Are you registered to vote?</Text>
      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          title="Yes"
          onPress={props.onYesButtonPress}
        />
        <Button
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          title="No/Not Sure"
          onPress={props.onNoButtonPress}
        />
      </View>
    </View>
  );
};

VoterRegAlert.propTypes = {
  isUserRegistered: PropTypes.bool.isRequired,
  onYesButtonPress: PropTypes.func.isRequired,
  onNoButtonPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: colors.red,
    minHeight: 100,
    padding: 16,
    borderRadius: 2,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    margin: 8,
  },
  title: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: colors.white,
    width: 130,
    height: 40,
    margin: 8,
    padding: 8,
  },
  buttonText: {
    color: colors.black,
  },
});

export default VoterRegAlert;
