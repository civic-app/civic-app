import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import colors from '../../styles/colors';
import { formTypes } from '../../auth/redux';
import SocialButton from '../Auth/SocialButton';
import FacebookAuthButton from '../Auth/FacebookAuthButton';
import GoogleAuthButton from '../Auth/GoogleAuthButton';

class WelcomePanel extends React.Component {
  static propTypes = {
    switchFormType: PropTypes.func.isRequired,
    formType: PropTypes.string.isRequired,
    navigate: PropTypes.func.isRequired,
  };

  defaultView = (
    <View style={styles.defaultViewContainer}>
      <Button
        backgroundColor={colors.red}
        borderRadius={3}
        color={colors.white}
        containerViewStyle={styles.buttonContainer}
        fontSize={16}
        title="Register"
        onPress={() => this.props.switchFormType(formTypes.SIGN_UP)}
      />
      <Button
        backgroundColor={colors.offWhite}
        borderRadius={3}
        color={colors.black}
        containerViewStyle={styles.buttonContainer}
        fontSize={16}
        title="Sign In"
        onPress={() => this.props.switchFormType(formTypes.LOGIN)}
      />
    </View>
  );

  expandedView = (formType) => {
    const config = ((type) => {
      switch (type) {
        case formTypes.INITIAL:
          return {};
        case formTypes.LOGIN:
          return {
            preposition: 'in',
            switchText: "Don't have an account yet? Register",
            otherFormType: formTypes.SIGN_UP,
          };
        case formTypes.SIGN_UP:
          return {
            preposition: 'up',
            switchText: 'Have an account? Sign in',
            otherFormType: formTypes.LOGIN,
          };
        default:
          return {};
      }
    })(formType);

    return (
      <View style={styles.expandedViewContainer}>
        <GoogleAuthButton title="Continue with Google" style={styles.social} />
        <FacebookAuthButton title="Continue with Facebook" style={styles.social} />
        <SocialButton
          title={`Sign ${config.preposition} with email`}
          style={styles.social}
          onPress={this.goToCredentials}
        />
        <Text style={[styles.text, styles.switchText]} onPress={() => this.props.switchFormType(config.otherFormType)}>
          {config.switchText}
        </Text>
      </View>
    );
  };

  goToCredentials = () => {
    this.props.navigate('Credentials');
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.formType === formTypes.INITIAL ? this.defaultView : this.expandedView(this.props.formType)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonContainer: {
    flex: 1,
    elevation: 2,
    borderRadius: 3,
    marginLeft: 10,
    marginRight: 10,
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
  defaultViewContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  expandedViewContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  social: {
    marginBottom: 5,
    width: '100%',
    maxWidth: 322,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 18,
  },
  switchText: {
    paddingBottom: 0,
  },
});

export default WelcomePanel;
