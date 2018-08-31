import { combineReducers } from 'redux';
import authReducer, { AUTH_NAMESPACE } from '../src/auth/redux';
import candidateReducer, { CANDIDATE_NAMESPACE } from '../src/candidate/redux/candidates';
import positionsReducer, { POSITIONS_NAMESPACE } from '../src/candidate/redux/positions';
import uiReducer, { UI_NAMESPACE } from '../src/UI/redux';
import favoritesReducer, { FAVORITES_NAMESPACE } from '../src/favorites/redux';
import questionStatus from '../src/screens/survey/redux/reducers/questionReducer';

const appReducer = combineReducers({
  [AUTH_NAMESPACE]: authReducer,
  [CANDIDATE_NAMESPACE]: candidateReducer,
  [POSITIONS_NAMESPACE]: positionsReducer,
  [UI_NAMESPACE]: uiReducer,
  [FAVORITES_NAMESPACE]: favoritesReducer,
  questionStatus
});

export default appReducer;
