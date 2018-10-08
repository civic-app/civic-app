import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const icon = require('../../assets/images/google-icon.png');

const GoogleIcon = () => (
  <View style={styles.iconContainer}>
    <Image source={icon} style={styles.googleIcon} />
  </View>
);

const styles = StyleSheet.create({
  googleIcon: {
    height: 28,
    width: 28,
  },
  iconContainer: {
    marginLeft: 2,
    marginRight: 14,
  },
});

export default GoogleIcon;
