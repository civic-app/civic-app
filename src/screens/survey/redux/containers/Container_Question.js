import {connect} from 'react-redux';
import Question from '../../Question';
import {loadQuestionStatus} from '../actions/Actions_question';

function mapStateToProps(state){
  return {
    questionStatus : state.questionStatus
  }
}

const mapDispatchToProps = dispatch => ({
  loadQuestionStatus: (index,response) => dispatch(loadQuestionStatus(index,response))
})

export default connect(mapStateToProps,mapDispatchToProps)(Question);
