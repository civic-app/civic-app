import React from 'react';
import { Text, View, Button,StyleSheet,TouchableHighlight,TouchableOpacity, Image, BackHandler} from 'react-native';
import {createStackNavigator} from 'react-navigation';

class Question1 extends React.Component {

  constructor(props){
    super(props);
    this.state = {
    }
    this.handleBackPress = this.handleBackPress.bind(this);
  }

  componentDidMount() {
     BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
   }

  // Still need to figure out how we want the transition
  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  }


  render() {
    return (
      <View style={styles.survey_block}>
        <View style={styles.block1}>
          <Text style={[styles.font_style, styles.title] }>Should the government {"\n"}provide public healthcare {"\n"}for all Americans? </Text>
        </View>

        <Image style={styles.question_image} source={require('./lib/1.png')}/>

      <View style={styles.button_row}>

              <TouchableHighlight style={styles.response} onPress = {() => this.props.navigation.navigate('Question6')}>
               <Text style={[styles.font_style,styles.response_text]}> NO </Text>
             </TouchableHighlight>

             <TouchableHighlight style={styles.response} onPress = {() => this.props.navigation.navigate('Question6')}>
              <Text style={[styles.font_style,styles.response_text]}> YES </Text>
            </TouchableHighlight>
        </View>

        <Text> How important is this issue to you? </Text>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  survey_block: {
    width: 330,
    height: 519,
    backgroundColor: 'white',
    overflow: 'hidden',
    alignItems: 'center',
    borderRadius: 20,
    position: 'absolute',
    //Shadow stuff
    shadowColor: '#E5E5E5',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },
  block1: {
    width:292,
    height: 115,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  question_image: {
  },
  font_style: {
    fontFamily: 'Roboto',
    fontSize: 18,
    textAlign: 'justify'
  },
  response: {
    width: 127,
    height: 44,
    backgroundColor: '#2D9CDB',
    marginLeft:10,
    marginRight:10,
    justifyContent: 'center',
    alignItems: 'center',
    //Shadow stuff
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  response_text: {
    color: 'white',
    fontWeight: 'bold',
  },
  button_row: {
    flex: 0.25,
    marginTop: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 150/2,
    backgroundColor: '#00BCD4'
  }
})

export default Question1;
