import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Placeholder from '../src/welcome/WelcomeContainer';

const App = () => (
  <View style={styles.container}>
    <Placeholder />
    <Text>Changes you make will automatically reload.</Text>
    <Text>Shake your phone to open the developer menu.</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
