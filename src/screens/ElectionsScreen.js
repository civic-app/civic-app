import React from 'react';
import PropTypes from 'prop-types';
import { Button, View } from 'react-native';
import styles from './styles';

class ElectionsScreen extends React.Component {
  static navigationOptions = {
    title: 'Elections',
  };
  static propTypes = propTypes;

  goToCandidateDetail = () => this.props.navigation.navigate('CandidateDetail');

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="View Candidate Detail"
          onPress={this.goToCandidateDetail}
        />
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
