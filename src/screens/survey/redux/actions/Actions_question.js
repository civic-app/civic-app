import * as actionType from './ActionType';

export const loadQuestionStatus = (index,response) => ({
  type: actionType.LOAD_RESPONSE,
  questionNum: index,
  payload: response
});
