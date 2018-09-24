import * as actionType from './ActionType';
export const SURVEY_NAMESPACE = 'survey'


// Survey Questions Actions
export const loadQuestionResponse = (questionid,response) => ({
  type: actionType.LOAD_QUESTION_RESPONSE,
  questionId : questionid,
  response: response
});

export const increaseIndex = () => ({
  type: actionType.INCREASE_INDEX
})

export const decreaseIndex = () => ({
  type: actionType.DECREASE_INDEX
})

export const setMaxIndex = () => ({
  type: actionType.SET_MAX_INDEX
})

export const addKeyToSet = (key) => ({
  type: actionType.ADD_KEY_TO_SET,
  key: key
})

export const setNumSurveyQuestions = (surveyObject) => ({
  type: actionType.SET_NUM_SURVEY_QUESTIONS,
  survey: surveyObject
})

// Send to Database actions

export const writeResponsesToDatabase = () => ({
  type: actionType.WRITE_TO_DATABASE
})

export const writeSuccess = () => ({
  type: actionType.WRITE_SUCCESS
})

export const writeFailure = (errorMessage) => ({
  type: actionType.WRITE_SUCCESS,
  error: errorMessage
})
