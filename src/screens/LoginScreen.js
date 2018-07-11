import React from 'react';
import PropTypes from 'prop-types';
import { Button, StyleSheet, View } from 'react-native';
import colors from '../styles/colors';

class LoginScreen extends React.Component {
  static propTypes = propTypes;
  goToSurvey = () => this.props.navigation.navigate('Survey');

  render() {
    return (
      <View style={styles.container}>
        <Button title={'Go to Survey'} onPress={this.goToSurvey} />
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

export default LoginScreen;
