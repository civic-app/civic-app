import { all } from 'redux-saga/effects';
import authSaga from '../src/auth/sagas';
import userSaga from '../src/user/sagas';
import matchSaga from '../src/match/sagas';
import surveySaga from '../src/screens/Survey/sagas'
import electionsScreenSaga from '../src/screens/Elections/sagas';

const appSaga = function*() {
  yield all([
    authSaga(),
    userSaga(),
    electionsScreenSaga(),
    matchSaga(),
    surveySaga()
  ]);
};

export default appSaga;
