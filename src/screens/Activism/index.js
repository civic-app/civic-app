import React from 'react';
import { Share, ScrollView, View, Text, StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';
import SquareButton from './SquareButton';
import { Icon } from 'react-native-elements';
import ShareButton from '../components/ShareButton';
import Colors from '../../styles/colors';

class ActivismScreen extends React.Component {
  static navigationOptions = {
    title: 'Activism',
  };

  handlePress = () => {
    Share.share({
      message: "Check out the Civic App!",
      url: "https://www.getcivicapp.com/",
      title: "Civic App"
    },
    {
      dialogTitle: "Civic App"
    })
  }

  render() {
    const { handlePress } = this;
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.heading}>Help friends vote and boost your impact</Text>
          <Text style={styles.subHeading}>Invite friends in California to vote with a personal note!</Text>
          <Text style={styles.subHeading}>Research shows that personal messages increase voter turnout</Text>
          <Icon
            name="megaphone"
            size={90}
            type="entypo"
            color={Colors.darkBlue}
          />
          <View style={styles.containerViewStyle}>
            <ShareButton
              title="Invite Friends with Civic"
              buttonStyle={styles.buttonStyle}
              onPress={handlePress}
            />
          </View>
        </View>
      </View>
    );
  }
}

ActivismScreen.propTypes = {
  user: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center'
  },
  card: {
    flex:1,
    backgroundColor: Colors.white,
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
    maxHeight: 480,
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
  heading: {
    fontSize: 28,
    textAlign: 'center',
    margin: 10,
    marginBottom: 0
  },
  subHeading: {
    fontSize: 18,
    margin: 10,
    marginTop: 0,
    marginBottom: 0
  },
  containerViewStyle: {
    margin: 10,
  },
  buttonStyle: {
    justifyContent: 'space-around',
    backgroundColor: Colors.red,
  }
})

export default ActivismScreen;
