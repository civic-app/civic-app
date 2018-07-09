import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import colors from '../styles/colors';
import Welcome from '../welcome/Welcome';

class WelcomeScreen extends React.Component {
  static propTypes = propTypes;

  render() {
    return (
      <View style={styles.container}>
        <Welcome />
      </View>
    );
  }
}

const propTypes = {
  navigation: PropTypes.objectOf({
    navigate: PropTypes.func,
    push: PropTypes.func,
  }),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.lightBlue,
  },
});

export default WelcomeScreen;
