import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Button } from 'react-native-elements';
import { GoogleIcon } from './WelcomeImages';
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
  sharedButtonProps = {
    borderRadius: 3,
    containerViewStyle: styles.buttonContainer,
    fontSize: 18,
  };

  constructor(props) {
    super(props);

    this.icons = {
      google: <GoogleIcon />,
    };

    this.state = {
      image: <GoogleIcon />,
      title: 'Sign In With Google',
      expanded: true,
    };
  }

  toggle() {}

  render() {
    return (
      <View style={styles.container}>
        <Button
          {...this.sharedButtonProps}
          color={colors.white}
          backgroundColor={colors.red}
          title="Register"
          onPress={() => undefined}
        />
        <Button
          {...this.sharedButtonProps}
          color={colors.black}
          backgroundColor={colors.offWhite}
          title="Sign In"
          onPress={() => undefined}
        />
      </View>
    );
  }
}
export default WelcomePanel;
