import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Colors from '../styles/colors';

class VoterRegistrationScreen extends React.Component {
    static propTypes = propTypes;
    goToTurboVote = () => this.props.navigation.navigate('TurboVote');

    sharedButtonProps = {
      borderRadius: 3,
      containerViewStyle: styles.buttonContainer,
      fontSize: 18,
    };

    render() {
        return (
            <View style={styles.container}>
              <View style={styles.card}>
                <Text style={styles.textHeader}>Let's get you registered to vote!</Text>
                <Text style={styles.textSubheader}>Registering takes 3 minutes.</Text>
                <Image style={styles.voterLogo} source={require('../assets/images/VoterBox.png')} />
                <Button
                  {...this.sharedButtonProps}
                  backgroundColor={Colors.red}
                  color={Colors.white}
                  title="Register To Vote" onPress={this.goToTurboVote}
                />
              </View>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex:1,
    backgroundColor: Colors.white,
    borderRadius: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
    maxHeight: 500,
    maxWidth: 330,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
    elevation:2,
    shadowColor:'black',
    shadowOffset: {
      width:2, height:2
    },
    shadowRadius: 3,
    shadowOpacity: 0.2
  },
  voterLogo: {
    height: 158,
    width: 158,
    marginLeft: 15,
  },
  buttonContainer: {
    elevation: 2,
    borderRadius: 3,
    minWidth: 200,
    marginTop: 20,
    marginBottom: 20,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  textHeader: {
    textAlign: 'center',
    fontSize: 28,
    marginTop: 20,
  },
  textSubheader: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 20,
  },
});

export default VoterRegistrationScreen;
