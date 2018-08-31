import React from 'react';
import { Text, View, Button,StyleSheet,TouchableWithoutFeedback,TouchableHighlight,TouchableOpacity, Image, BackHandler} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import Checkbox from './checkbox';
import { StackActions, NavigationActions } from 'react-navigation';
import * as questions from './lib/questions.json';
import * as UserResponse from './lib/userResponses.json'

class Question extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      UserResponse: UserResponse.default,
      questionStatus: this.props.questionStatus,
      index: this.props.screenProps[0]
    }
    this.nextScreen = this.nextScreen.bind(this);
    this.changeUserResponseField = this.changeUserResponseField.bind(this);
  }

  // Sends specific question to All responses made by user
   sendUserResponse(){
     this.props.screenProps[2](this.state.index,this.state.UserResponse)
   }

   // Changes the index by an x amount
   indexAdd(increment){
     this.props.screenProps[1](increment)
   }

   sendQuestionsToFirebase(){
     this.props.screenProps[3]();
   }

   handleBackPress = () => {
     return true;
   }

  changeUserResponseField(field,value){
    this.setState(prevState=> ({
      UserResponse: {
        ...prevState.UserResponse,
        [field]: value
      }
    }))
  }

  nextScreen = () => {
      this.props.loadQuestionStatus(this.state.index,this.state.UserResponse.questionResponse)
      this.sendUserResponse();
      if(this.state.index < 10){
        this.indexAdd(1);
        var questionnum = "Question" + this.state.index;
        this.props.navigation.navigate(questionnum, this.state.index);
      } else if (this.state.index == 10){
        this.sendQuestionsToFirebase();
      }
  }

  componentDidMount() {
    this.changeUserResponseField("questionNum", questions["question" + this.state.index].id)
    // If the question Status for this question exists
    if(this.props.questionStatus['question'+ this.state.index] != null){
      this.changeUserResponseField("questionResponse", this.props.questionStatus['question'+this.state.index].response)
    }
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillReceiveProps(nextProps) {
    // Updates the index after indexAdd has been used to change the value in the parent component
    if (nextProps.screenProps !== this.state.screenProps) {
      this.setState({ index: nextProps.screenProps[0] });
    }
  }

  componentWillUnmount() {
     BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
     if(this.state.index > 1){
       this.indexAdd(-1);
     }
   }


  render(){

    let questionObject = questions["question" + this.state.index];

    return (
      <View style={styles.survey_block} elevation={5}>

        <View style={styles.block1}>
          <Text style={[styles.font_style, styles.title] }> {questionObject.qtext} </Text>
        </View>

        <Image source={{uri: questionObject.pic? questionObject.pic : null }} style={{width: 334, height: 187}} />

        <Checkbox changeUserResponseField={this.changeUserResponseField} index={this.state.index} questionStatus={this.state.questionStatus} nextScreen={this.nextScreen}/>

        <View style={{width: 283, flexDirection: 'row',justifyContent: 'space-between'}}>
          <Text style={styles.option_text}>Strongly{'\n'}Disagree</Text>
          <Text style={styles.option_text}>No{'\n'}opinion</Text>
          <Text style={styles.option_text}>Strongly{'\n'}Agree</Text>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  survey_block: {
    width: 330,
    height: 490,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 20,
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
    width: 292,
    height: 115,
    justifyContent: 'center',
    alignItems: 'center',
  },

  option_text:{
    textAlign: 'center'
  },
  title: {
    fontSize: 24,
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
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    //Shadow stuff
    shadowColor: '#000000',
    shadowOffset: {
      width: 130,
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
  block2: {
    marginTop: 44
  },
  block3: {
    width: 260,
    height: 36,
    borderRadius: 27,
    borderWidth: 1
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 150/2,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default Question;
