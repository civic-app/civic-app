import { call, select, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { getLoggedInUserId } from '../auth/selectors';
import { logOutSaga } from '../auth/sagas';
import { fetchUser, putDistrict, putUserRegistered } from './api';
import { UserActionType, userFetchSuccess } from './redux';

export const loadUserDataSaga = function*(_action, passedInUserId) {
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

export const saveUserDistrictSaga = function*(action) {
  try {
    const userId = yield select(getLoggedInUserId);
    yield call(putDistrict, userId, action.payload);
  } catch (error) {
    // TODO: handle errors
  }
};

export const saveIsUserRegisteredSaga = function*(action) {
  try {
    const userId = yield select(getLoggedInUserId);
    yield call(putUserRegistered, userId, action.payload);
  } catch (error) {
    // TODO: handle errors
  }
};

export default function*() {
  yield takeEvery(UserActionType.Request, loadUserDataSaga);
  yield takeLatest(UserActionType.SaveDistrict, saveUserDistrictSaga);
  yield takeLatest(UserActionType.SaveUserRegistered, saveIsUserRegisteredSaga);
}
