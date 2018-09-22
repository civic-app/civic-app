import {connect} from 'react-redux';
import SurveyMainScreen from '../../SurveyMainScreen';
import {addKeyToSet,
        setNumSurveyQuestions,
        SURVEY_NAMESPACE} from '../actions/Actions_question';
import {getQuestionResponses,
        getIndex,
        getTotalNumQuestions} from '../actions/Selectors'
import {loadSurvey} from '../../../../match/redux';
import {getSurveyQuestions} from '../../../../match/redux';

function mapStateToProps(state){
  return {
    questionResponses : getQuestionResponses(state),
    index : getIndex(state),
    totalNumQuestions: getTotalNumQuestions(state),
    surveyQuestions: getSurveyQuestions(state)
  }
}

const mapDispatchToProps = dispatch => ({
  addKeyToSet: (key) => dispatch(addKeyToSet(key)),
  loadSurvey: () => dispatch(loadSurvey()),
  setNumSurveyQuestions: (surveyObject) => dispatch(setNumSurveyQuestions(surveyObject)),
});

export default connect(mapStateToProps,mapDispatchToProps)(SurveyMainScreen);
