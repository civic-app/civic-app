import { combineReducers } from 'redux';
import authReducer, { AUTH_NAMESPACE } from '../src/auth/redux';
import candidateReducer, { CANDIDATE_NAMESPACE } from '../src/candidate/redux/candidates';
import positionsReducer, { POSITIONS_NAMESPACE } from '../src/candidate/redux/positions';
import uiReducer, { UI_NAMESPACE } from '../src/UI/redux';
import favoritesReducer, { FAVORITES_NAMESPACE } from '../src/favorites/redux';
import surveyReducer from '../src/screens/Survey/redux/reducers/SurveyReducer';
import { SURVEY_NAMESPACE } from '../src/screens/Survey/redux/actions/Actions_question';
import matchReducer, { MATCH_NAMESPACE } from '../src/match/redux';
import userReducer, { USER_NAMESPACE } from '../src/user/redux';

const appReducer = combineReducers({
  [AUTH_NAMESPACE]: authReducer,
  [CANDIDATE_NAMESPACE]: candidateReducer,
  [POSITIONS_NAMESPACE]: positionsReducer,
  [UI_NAMESPACE]: uiReducer,
  [FAVORITES_NAMESPACE]: favoritesReducer,
  [SURVEY_NAMESPACE]: surveyReducer,
  [MATCH_NAMESPACE]: matchReducer,
  [USER_NAMESPACE]: userReducer,
});

export default appReducer;
