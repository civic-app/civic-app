import { setByPath } from '../firebase/initialize';
import { getDataFromGoogleSpreadsheet } from '../googleDriveApi/getData';

const surveyQuestionsDriveId = '1Kh36D5DOyO8_it63OD-o51b2F4rlKfeLwnCbnaQZ5XE';

export const fetchSurveyQuestions = () => (
  getDataFromGoogleSpreadsheet(surveyQuestionsDriveId)
);

// newResponses should be an object: { [questionId]: { ...response values }
export const saveUserResponses = (userId, newResponses) => (
  setByPath(`users/${userId}/responses`, newResponses)
);
