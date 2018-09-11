import React, {Component} from 'react';
import { View, Button } from 'react-native';
import DistrictMatch from './DistrictMatch';

import styles from '../styles';

class DistrictMatchScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <DistrictMatch navigate={this.props.navigation.navigate}/>
      </View>
    );
  }
}

export default DistrictMatchScreen;
