import { StyleSheet, View } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import colors from '../styles/colors';

var styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 3,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});

class WelcomePanel extends React.Component {
  static propTypes = {
    onButtonPress: PropTypes.func,
  };

  sharedButtonProps = {
    borderRadius: 3,
    containerViewStyle: styles.buttonContainer,
    fontSize: 18,
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          {...this.sharedButtonProps}
          color={colors.white}
          backgroundColor={colors.red}
          title="Register"
          onPress={this.props.onButtonPress}
        />
        <Button
          {...this.sharedButtonProps}
          color={colors.black}
          backgroundColor={colors.offWhite}
          title="Sign In"
          onPress={this.props.onButtonPress}
        />
      </View>
    );
  }
}

export default WelcomePanel;
