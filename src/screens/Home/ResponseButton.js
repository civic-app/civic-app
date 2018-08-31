import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Colors from '../../styles/colors';

const ResponseButton = ({title, onPress}) => (
  <Button
    raised
    onPress={onPress}
    borderRadius={2}
    title={title}
    containerViewStyle={styles.buttonContainerView}
    buttonStyle={styles.buttonStyle}
    titleStyle={styles.buttonTitleStyle}
  />
);

const styles = StyleSheet.create({
  buttonContainerView: {
    flex: 1,
    width:'50%',
  },
  buttonStyle: {
    backgroundColor: Colors.red,
    height: 36,
  },
  buttonTitleStyle: {
    color:Colors.white,
    fontSize: 14
  },
});

export default ResponseButton;
