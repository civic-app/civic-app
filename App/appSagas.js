import { all } from 'redux-saga/effects';
import authSaga from '../src/auth/sagas';

const appSaga = function*() {
  yield all([authSaga()]);
};

export default appSaga;
