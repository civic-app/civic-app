import { combineReducers } from 'redux'
import authReducer, { AUTH_NAMESPACE } from '../src/auth/redux'
import candidateReducer, { CANDIDATE_NAMESPACE } from '../src/candidate/redux/candidates'
import positionsReducer, { POSITIONS_NAMESPACE } from '../src/candidate/redux/positions'

const appReducer = combineReducers({
  [AUTH_NAMESPACE]: authReducer,
  [CANDIDATE_NAMESPACE]: candidateReducer,
  [POSITIONS_NAMESPACE]: positionsReducer,
})

export default appReducer
