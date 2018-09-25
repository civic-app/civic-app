import React from 'react';
import { Text, View, StyleSheet, Image, BackHandler} from 'react-native';
import Checkbox from './checkbox';
import { StackActions } from 'react-navigation';
import * as UserResponse from './lib/userResponses.json';

class Question extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      response: UserResponse.default,
    }
    this.nextScreen = this.nextScreen.bind(this);
    this.changeUserResponseField = this.changeUserResponseField.bind(this);
  }

  handleBackPress = () => {
    return true;
  }

  changeUserResponseField(field,value,callback){
    if (callback === null) {
      this.setState({...this.state, response: {...this.state.response, [field]: value}});
    } else {
      this.setState({...this.state, response: {...this.state.response, [field]: value}}, callback);
    }
  }


  nextScreen = () => {
    this.props.loadQuestionResponse(this.state.response.questionId,this.state.response.response);
    this.props.increaseIndex();
    this.props.setMaxIndex();
    if(this.props.index < this.props.totalNumQuestions){
      this.props.navigation.dispatch(StackActions.push({routeName:'Question', params: {}}))
    }
    if(this.props.index === this.props.totalNumQuestions){
      // Go to next section
      this.props.writeResponsesToDatabase();
      this.props.navigation.navigate('DistrictMatch');
    }
  }

  componentDidMount() {
    //Set total number of questions from the spreadsheet
    this.props.setNumSurveyQuestions(this.props.surveyQuestions);
    // Set question number to current response
    this.changeUserResponseField("questionId", this.props.surveyQuestions[this.props.questionKeys[this.props.index-1]].id)
    // If the question exists in the set of responses, set the current response to it
    if(typeof this.props.questionResponses[this.props.index-1] !== 'undefined'){
      this.changeUserResponseField("response", this.props.questionResponses[this.props.index-1].questionResponse)
    }

    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

  }

  componentWillUnmount() {
    //Remove BackHandler
     BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
     this.props.decreaseIndex();
     if(this.props.index === 1){
       this.props.setNumSurveyQuestions(null)
     }
   }

  render(){

    let questionIndex = this.props.questionKeys[this.props.index-1];
    let questionObject = this.props.surveyQuestions[questionIndex];
    return (
      <View style={styles.survey_block} elevation={5}>

        <View style={styles.block1}>
          <Text style={[styles.font_style, styles.title] }> {questionObject.text} </Text>
        </View>

        <Image source={{uri: questionObject.image ? questionObject.image : null }} style={{width: 334, height: 187}} />

        <Checkbox changeUserResponseField={this.changeUserResponseField} questionResponses={this.props.questionResponses}
          questionIndex={questionIndex} nextScreen={this.nextScreen} />

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
