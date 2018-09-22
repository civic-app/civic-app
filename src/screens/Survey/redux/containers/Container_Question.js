import {connect} from 'react-redux';
import Question from '../../Question';
import {writeResponsesToDatabase,
        setNumSurveyQuestions,
        loadQuestionResponse,
        updateTotalQuestions,
        addKeyToSet,
        increaseIndex,
        decreaseIndex,
        setMaxIndex,
        SURVEY_NAMESPACE} from '../actions/Actions_question';
import {
        getQuestionResponses,
        getIndex,
        getTotalNumQuestions,
        getQuestionKeys,
        getDatabaseArgs
      } from '../actions/Selectors'
import {getSurveyQuestions} from '../../../../match/redux';

function mapStateToProps(state){
  return {
    questionResponses : getQuestionResponses(state),
    index : getIndex(state),
    totalNumQuestions: getTotalNumQuestions(state),
    surveyQuestions: getSurveyQuestions(state),
    questionKeys: getQuestionKeys(state),
    databaseArgs: getDatabaseArgs(state)
  }
}

function mapDispatchToProps(dispatch){
  return {
    loadQuestionResponse: (questionnum,response) => dispatch(loadQuestionResponse(questionnum,response)),
    increaseIndex: () => dispatch(increaseIndex()),
    decreaseIndex: () => dispatch(decreaseIndex()),
    setMaxIndex: () => dispatch(setMaxIndex()),
    writeResponsesToDatabase: () => dispatch(writeResponsesToDatabase()),
    addKeyToSet: (key) => dispatch(addKeyToSet(key)),
    setNumSurveyQuestions: (surveyObject) => dispatch(setNumSurveyQuestions(surveyObject))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Question);
