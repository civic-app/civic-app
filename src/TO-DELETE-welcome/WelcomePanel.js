import { Animated, StyleSheet, Text, View, Alert } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import colors from '../styles/colors';
import { formTypes } from '../auth/redux';
import SocialButton from '../auth/SocialButton';
import Expo from 'expo';
import {
  signInWithFacebookAsync as fbSignIn,
  signInWithGoogleAsync as googleSignIn,
} from '../auth/socialauth';

class WelcomePanel extends React.Component {
  static propTypes = {
    switchFormType: PropTypes.func,
    formType: PropTypes.string,
    navigate: PropTypes.func,
  };

  sharedButtonProps = {
    borderRadius: 3,
    containerViewStyle: styles.buttonContainer,
    fontSize: 18,
  };

  defaultView = (
    <View style={styles.defaultViewContainer}>
      <Button
        {...this.sharedButtonProps}
        color={colors.white}
        backgroundColor={colors.red}
        title="Register"
        onPress={() => this.props.switchFormType(formTypes.SIGN_UP)}
      />
      <Button
        {...this.sharedButtonProps}
        color={colors.black}
        backgroundColor={colors.offWhite}
        title="Sign In"
        onPress={() => this.props.switchFormType(formTypes.LOGIN)}
      />
    </View>
  );

  async signInWithGoogleAsync() {
    const resp = await googleSignIn();
    if (resp !== 'fail') {
      Alert.alert('Logged in Google!');
      this.props.navigate('Home');
    } else {
      Alert.alert('something went wrong!');
    }
  }

  async signInWithFacebookAsync() {
    const resp = await fbSignIn();
    if (resp !== 'fail') {
      Alert.alert('Logged in via FB!');
      this.props.navigate('Home');
    } else {
      Alert.alert('something went wrong!');
    }
  }

  expandedView = formType => {
    const config = (type => {
      switch (type) {
        case formTypes.INITIAL:
          return {};
        case formTypes.LOGIN:
          return {
            preposition: 'in',
            switchText: 'Don\'t have an account yet? Register',
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

    return config ? (
      <View style={styles.expandedViewContainer}>
        <SocialButton
          type="google"
          title={`Sign ${config.preposition} with Google`}
          style={styles.social}
          onPress={this.signInWithGoogleAsync.bind(this)}
          onLongPress={this.signInWithGoogleAsync.bind(this)}
        />
        <SocialButton
          type="facebook"
          title="Continue with Facebook"
          style={styles.social}
          onPress={this.signInWithFacebookAsync.bind(this)}
          onLongPress={this.signInWithFacebookAsync.bind(this)}
        />
        <Text style={styles.text}>or</Text>
        <SocialButton
          type="email"
          title={`Sign ${config.preposition} with email`}
          style={styles.social}
          onPress={this.goToCredentials}
        />
        <Text
          style={[styles.text, styles.switchText]}
          onPress={() => this.props.switchFormType(config.otherFormType)}
        >
          {config.switchText}
        </Text>
      </View>
    ) : null;
  };

  goToCredentials = () => {
    this.props.navigate('Credentials');
  };

  render() {
    return (
      <Animated.View
        style={[
          styles.container,
          this.props.formType !== formTypes.INITIAL && styles.containerExpanded,
        ]}
      >
        {this.props.formType === formTypes.INITIAL
          ? this.defaultView
          : this.expandedView(this.props.formType)}
      </Animated.View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  containerExpanded: {
    position: 'absolute',
    bottom: 0,
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
    marginBottom: 8,
    width: '100%',
    maxWidth: 322,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 18,
  },
  switchText: {
    paddingBottom: 0,
  },
});

export default WelcomePanel;