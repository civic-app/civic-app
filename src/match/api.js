import { setByPath } from '../firebase/initialize';
import { getDataFromGoogleSpreadsheet } from '../googleDriveApi/getData';

const surveyQuestionsDriveId = process.env.REACT_NATIVE_SURVEY_QUESTIONS_DRIVE_ID;

export const fetchSurveyQuestions = () => getDataFromGoogleSpreadsheet(surveyQuestionsDriveId);

// newResponses should be an object: { [questionId]: { ...response values }
export const saveUserResponses = (userId, newResponses) => setByPath(`users/${userId}/responses`, newResponses);
