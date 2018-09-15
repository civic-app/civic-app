import { all } from 'redux-saga/effects';
import authSaga from '../src/auth/sagas';
import userSaga from '../src/user/sagas';
import electionsScreenSaga from '../src/screens/Elections/sagas';

const appSaga = function*() {
  yield all([
    authSaga(),
    electionsScreenSaga(),
    userSaga(),
  ]);
};

export default appSaga;
