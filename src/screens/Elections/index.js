import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styles from '../styles';
import Screen from './ScreenContainer';

class ElectionsScreen extends React.Component {
  static navigationOptions = {
    title: 'Elections',
  };
  static propTypes = propTypes;

  goToCandidateDetail = (id) => () => this.props.navigation.navigate('CandidateDetail', { id });

  render() {
    return (
      <View style={styles.container}>
        <Screen goToCandidateDetail={this.goToCandidateDetail} />
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

export default ElectionsScreen;
