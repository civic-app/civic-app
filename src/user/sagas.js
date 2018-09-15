import { call, select, put, takeEvery } from 'redux-saga/effects';
import { getLoggedInUserId } from '../auth/redux';
import { logOutSaga } from '../auth/sagas';
import { fetchUser } from './api';

export const loadUserDataSaga = function*() {
  try {
    const userId = yield select(getLoggedInUserId);
    if (userId) {
      const userResponse = yield call(fetchUser, userId);
      yield put(userFetchSuccess(userResponse))
    } else {
      yield call(logOutSaga)
    }

  } catch (err) {
    // TODO: handle error
  }
};

export const userFetchSuccess = ({ responses, favorites, user }) => ({
  type: UserActionType.RequestSuccess,
  payload: { responses, favorites, user },
});

export const loadUser = (force = false) => ({
  type: UserActionType.Request,
  payload: force
});

export const UserActionType = {
  Request: 'civicApp/user/REQUEST',
  RequestSuccess: 'civicApp/user/REQUEST_SUCCESS',
};

export default function*() {
  yield takeEvery(UserActionType.Request, loadUserDataSaga);
}
