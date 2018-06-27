import { combineReducers } from 'redux';
import authReducer, { AUTH_NAMESPACE } from './auth';

const appReducer = combineReducers({
  [AUTH_NAMESPACE]: authReducer,
});

export default appReducer;
