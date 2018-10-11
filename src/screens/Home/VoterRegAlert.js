import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import colors from '../../styles/colors';

const VoterRegAlert = props => {
  return props.isUserRegistered ? null : (
    <View style={styles.container}>
      <Text style={styles.title}>Are you registered to vote?</Text>
      <View style={styles.buttonGroup}>
        <Button
          buttonStyle={styles.button}
          containerViewStyle={styles.buttonContainer}
          borderRadius={3}
          textStyle={styles.buttonText}
          title="Yes"
          onPress={props.onYesButtonPress}
        />
        <Button
          buttonStyle={styles.button}
          containerViewStyle={styles.buttonContainer}
          borderRadius={3}
          textStyle={styles.buttonText}
          title="No / Not Sure"
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
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: colors.red,
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
    marginBottom: 0,
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

export default VoterRegAlert;
