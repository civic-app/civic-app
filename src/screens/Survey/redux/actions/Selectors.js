import {SURVEY_NAMESPACE} from './Actions_question'

//Selectors
export const getQuestionResponses =(state) => state[SURVEY_NAMESPACE].questionResponses
export const getIndex = (state) => state[SURVEY_NAMESPACE].index
export const getTotalNumQuestions = (state) => state[SURVEY_NAMESPACE].totalNumQuestions
export const getQuestionKeys = (state) => state[SURVEY_NAMESPACE].questionKeys
export const getDatabaseArgs = (state) => state[SURVEY_NAMESPACE].databaseArgs
