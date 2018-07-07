import React from 'react';
import PropTypes from 'prop-types';
import { View, Button } from 'react-native';
import styles from './styles';

class LoginScreen extends React.Component {
  static propTypes = propTypes;
  goToSurvey = () => this.props.navigation.navigate('Survey');

  render() {
    return (
      <View style={styles.container}>
        <Button title="Go to Survey" onPress={this.goToSurvey} />
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

export default LoginScreen;
