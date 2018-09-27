import { call, select, put, takeEvery } from 'redux-saga/effects';
import { getLoggedInUserId } from '../auth/selectors';
import { logOutSaga } from '../auth/sagas';
import { fetchUser } from './api';
import { UserActionType, userFetchSuccess } from './redux';

export const loadUserDataSaga = function*(passedInUserId) {
  try {
    let userId = yield select(getLoggedInUserId);
    // use passed in value as default if no id in state
    userId = userId || passedInUserId;
    if (userId) {
      const userResponse = yield call(fetchUser, userId);
      yield put(userFetchSuccess(userResponse));
    } else {
      yield call(logOutSaga);
    }
  } catch (err) {
    // TODO: handle error
  }
};

export default function*() {
  yield takeEvery(UserActionType.Request, loadUserDataSaga);
}
