import React from 'react';
import { StyleSheet, WebView, View } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import colors from '../styles/colors';

class TurboVoteScreen extends React.Component {
  static propTypes = propTypes;
  goToSuccessScreen = () => this.props.navigation.navigate('VoterRegSuc');

  sharedButtonProps = {
    borderRadius: 5,
    containerViewStyle: styles.buttonContainer,
    fontSize: 18,
  };

  render() {
    return (
      <View style={styles.container}>
        <WebView
          source={{
            uri: 'https://inline.turbovote.org/?r=civic',
          }}
          style={styles.webView}
        />
        <Button
          {...this.sharedButtonProps}
          buttonStyle={styles.buttonStyle}
          backgroundColor={colors.red}
          title="Done with Registration"
          onPress={this.goToSuccessScreen}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  webView: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 5,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  buttonStyle: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default TurboVoteScreen;
