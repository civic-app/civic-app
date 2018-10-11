import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { saveUserRegistered } from '../user/redux';
import { getUserRegistered } from '../user/selectors';
import Colors from '../styles/colors';

class VoterRegistrationSuccessScreen extends React.Component {
  static propTypes = propTypes;
  goToElections = () => this.props.navigation.navigate('Elections');

  componentDidMount() {
    if (!this.props.isRegistered) {
      this.props.saveUserRegistered(true);
    }
  }

  sharedButtonProps = {
    borderRadius: 3,
    containerViewStyle: styles.buttonContainer,
    fontSize: 18,
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.textHeader}>Congrats! You're registered to vote.</Text>
          <Text style={styles.textSubheader}>We'll remind you when it's time to cast your ballot.</Text>
          <Image style={styles.checkLogo} source={require('../assets/images/Check.png')} />
          <Button
            {...this.sharedButtonProps}
            backgroundColor={Colors.red}
            color={Colors.white}
            title="Back to My Elections"
            onPress={this.goToElections}
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
  checkLogo: {
    height: 116,
    width: 116,
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

VoterRegistrationSuccessScreen.propTypes = {
  isRegistered: PropTypes.bool,
  saveUserRegistered: PropTypes.func,
};

export default connect(
  state => ({ isRegistered: getUserRegistered(state) }),
  { saveUserRegistered: saveUserRegistered },
)(VoterRegistrationSuccessScreen);
