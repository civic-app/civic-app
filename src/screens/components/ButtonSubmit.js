import React from 'react';
import { StyleSheet, Text } from 'react-native';
import colors from '../../styles/colors';

const ButtonSumbit = ({onPress}) =>
  <Text onPress={onPress} style={styles.submitButton}>
    SUBMIT
  </Text>

const styles = StyleSheet.create({
  submitButton: {
    textAlign: 'right',
    paddingTop: 20,
    fontSize: 18,
    color: colors.darkBlue
  }
});

export default ButtonSumbit;
