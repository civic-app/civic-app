import React from 'react';
import { View, Button } from 'react-native';

import styles from '../styles';

class SurveyMainScreen extends React.Component {
  goToApp = () => this.props.navigation.navigate('App');
  goToDistrictMatch = () => this.props.navigation.navigate('DistrictMatch');

  render() {
    return (
      <View style={styles.container}>
        <Button title="Go to District Match" onPress={this.goToDistrictMatch}/>
        <Button title="Go to App" onPress={this.goToApp} />
      </View>
    );
  }
}

export default SurveyMainScreen;
