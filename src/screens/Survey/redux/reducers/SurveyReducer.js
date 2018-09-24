import * as actionType from '../actions/ActionType';
import {getSurveySize} from '../../../../match/redux'

const initialState = {
  index: 1,
  maxIndex: 1,
  totalNumQuestions: null,
  questionResponses : {},
  questionKeys: [],
  databaseArgs: {
    writeStatus: null,
    errorType: null
  }
}

const SurveyReducer = (state = initialState, action) => {
    let newIndex;
    switch(action.type){
      case actionType.LOAD_QUESTION_RESPONSE: {
        return {
          ...state,
          questionResponses : {
            ...state.questionResponses,
            [action.questionId]: {
              questionId : action.questionId,
              response: action.response
            }
          }
        }
      }
      case actionType.INCREASE_INDEX: {
        if( state.index < state.totalNumQuestions){
          newIndex = state.index + 1
        } else if(state.index === state.totalNumQuestions){
          newIndex = state.index
        }
        return {
          ...state,
          index : newIndex
        }
      }
      case actionType.DECREASE_INDEX: {
        if(state.index > 1) {
          newIndex = state.index - 1
        } else {
          newIndex = state.index
        }
        return {
          ...state,
          index: newIndex
        }
      }
      case actionType.SET_MAX_INDEX: {
        if(state.index > state.maxIndex){
          return {
            ...state,
            maxIndex : state.index + 1
          }
        }
      }
      case actionType.ADD_KEY_TO_SET: {
        return {
          ...state,
          questionKeys: [
            ...state.questionKeys,
            action.key
          ]
        }
      }
      case actionType.SET_NUM_SURVEY_QUESTIONS: {
        if(action.survey === null){
          return {
            ...state,
            totalNumQuestions: null
          }
        }
        return {
          ...state,
          totalNumQuestions: Object.keys(action.survey).length
        }
      }
      case actionType.WRITE_SUCCESS: {
        return {
          ...state,
          databaseArgs:{
            ...state.databaseArgs,
            writeStatus: 'sucess',
            errorType: {}
          }
        }
      }
      case actionType.WRITE_FAILURE: {
        return {
          ...state,
          databaseArgs: {
            ...state.databaseArgs,
            writeStatus: 'failure',
            errorType: action.error
          }
        }
      }
      default:
        return state
    }
}

export default SurveyReducer;
