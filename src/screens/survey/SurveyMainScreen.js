import React from 'react';
import PropTypes from 'prop-types';
import { View, Button } from 'react-native';

import styles from '../styles';

class SurveyMainScreen extends React.Component {
  static propTypes = propTypes;
  goToApp = () => this.props.navigation.navigate('App');

  render() {
    return (
      <View style={styles.container}>
        <Button title={'Go to App'} onPress={this.goToApp} />
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

export default SurveyMainScreen;
