import { all } from 'redux-saga/effects';
import authSaga from '../src/auth/sagas';
import electionsScreenSaga from '../src/screens/Elections/sagas';

const appSaga = function*() {
  yield all([
    authSaga(),
    electionsScreenSaga(),
  ]);
};

export default appSaga;
