import React from 'react';
import { Text, View, Button,StyleSheet,TouchableWithoutFeedback, Image, Easing , Animated} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation'
import SurveyStart from './SurveyStart';
import Question from './redux/containers/Container_Question'
import {database} from '../../firebase/initialize'

var RootStack = createStackNavigator(
  {
    Home: {screen: SurveyStart},
    Question1: {screen: Question},
    Question2: {screen: Question},
    Question3: {screen: Question},
    Question4: {screen: Question},
    Question5: {screen: Question},
    Question6: {screen: Question},
    Question7: {screen: Question},
    Question8: {screen: Question},
    Question9: {screen: Question},
    Question10: {screen: Question}
  },
  {
    cardStyle : {
      backgroundColor: 'transparent',
      alignItems:'center',
      justifyContent:'center'
    },
    headerMode: 'none',
    mode: 'card',
    swipeEnabled: true,
    navigationOptions: () => ({
      gesturesEnabled : true,
      gestureResponseDistance: {
        horizontal: 200
      }
    }),
    transitionConfig: () => ({
            screenInterpolator: sceneProps => {
                const { layout, position, scene } = sceneProps;
                const { index } = scene;

                const translateX = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [layout.initWidth, 0, 0]
                });

                const opacity = position.interpolate({
                    inputRange: [index - 1, index - 0.99, index, index + 0.99, index + 1],
                    outputRange: [0, 1, 1, 0.3, 0]
                });

                return { opacity, transform: [{ translateX }] }
            }
      })
  }
);

 class SurveyMainScreen extends React.Component {

   constructor(props){
     super(props);
     this.state = {
       user: 'Jose',
       userResponses: {},
       keySetResponses: [],
       index : 1
     }
     this.indexAdd = this.indexAdd.bind(this);
     this.addResponse = this.addResponse.bind(this);
     this.sendQuestionsToFirebase = this.sendQuestionsToFirebase.bind(this);
   }

   indexAdd(increment){
     let newIndex = this.state.index + increment;
     if(this.state.index < 10) {
      this.setState({index: newIndex});
    } else if( this.state.index === 10){
      if(increment < 0){
        this.setState({index: newIndex});
      }
    }
   }

   addResponse(index,value){
     let sentence = "question"+index;
     this.setState(prevState=> ({
       userResponses: {
         ...prevState.userResponses,
         [sentence]: value
       }}))
   }

   sendQuestionsToFirebase(){
     let itemsRef = database.ref('/questions')
     Object.keys(this.state.userResponses).map((question) => {
       var action = itemsRef.push(this.state.userResponses[question]);
       this.setState(prevState => ({
        keySetResponses: [...prevState.keySetResponses, action.key]
       }))
     })
   }


  render() {

    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>

        <View style={styles.container}>
          <View style={[styles.survey_block]}>
            {/* Sent index and functions as screenProps */}
            <RootStack screenProps={[this.state.index,this.indexAdd,this.addResponse,this.sendQuestionsToFirebase]}/>
          </View>
          <Text>{this.state.index}/10</Text>

      </View>
    </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    //Combined the two container styles so they didn't override each other
    paddingTop: 20,
    alignItems: 'center',
    flex: 7,
    //Aligned items flex-start so that they go to the top of the screen (leaving room for survey progress, etc)
    justifyContent: 'flex-start',
    //Grey
    backgroundColor: '#E5E5E5'
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  buttonText: {
    padding: 20,
    color: 'blue'
  },

  appbar_text: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 20,
    lineHeight: 23,
    marginTop: 45,
    marginLeft: 50,
    color: 'white'
  },

  //The white rectangle that holds the questions
  survey_block: {
    //originally 360, 550, borderwidth 50
    width: 360,
    height: 549,
  }
})

export default SurveyMainScreen;
