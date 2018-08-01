import { combineReducers } from 'redux'
import authReducer, { AUTH_NAMESPACE } from '../src/auth/redux'
import candidateReducer, { CANDIDATE_NAMESPACE } from '../src/candidate/redux/candidates'
import positionsReducer, { POSITIONS_NAMESPACE } from '../src/candidate/redux/positions'
import favoritesReducer, { FAVORITES_NAMESPACE } from '../src/favorites/redux';

const appReducer = combineReducers({
  [AUTH_NAMESPACE]: authReducer,
  [CANDIDATE_NAMESPACE]: candidateReducer,
  [POSITIONS_NAMESPACE]: positionsReducer,
  [FAVORITES_NAMESPACE]: favoritesReducer,
});

export default appReducer;
