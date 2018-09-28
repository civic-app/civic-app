import React, {Component} from 'react';
import { KeyboardAvoidingView, Button, StyleSheet } from 'react-native';
import DistrictMatch from './DistrictMatch';

class DistrictMatchScreen extends Component {
  render() {
    return (
      <KeyboardAvoidingView style={styles.keyboardAvoidView} behavior="position">
        <DistrictMatch navigate={this.props.navigation.navigate}/>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  keyboardAvoidView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  }
})

export default DistrictMatchScreen;
