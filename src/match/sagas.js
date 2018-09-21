import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchSurveyQuestions } from './api';
import { loadSurveySuccess, MatchActionType } from './redux';

export const loadSurveyQuestions = function* () {
  try {
    const surveyQuestions = yield call(fetchSurveyQuestions);
    yield put(loadSurveySuccess(surveyQuestions));
  } catch (err) {
    // TODO: handle errors
  }
};

const matchSaga = function* () {
  yield takeEvery(MatchActionType.SurveyRequest, loadSurveyQuestions);
};

export default matchSaga;
