import { combineReducers } from 'redux';
import authReducer, { AUTH_NAMESPACE } from '../src/auth/redux';

const appReducer = combineReducers({
  [AUTH_NAMESPACE]: authReducer,
});

export default appReducer;
