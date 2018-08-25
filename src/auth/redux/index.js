import { combineReducers } from 'redux';
import userReducer, { USER_NAMESPACE } from './userReducer';
import formReducer, { FORM_NAMESPACE } from './formReducer';

export const AUTH_NAMESPACE = 'auth';

const authReducer = combineReducers({
  [USER_NAMESPACE]: userReducer,
  [FORM_NAMESPACE]: formReducer,
});

export default authReducer;
