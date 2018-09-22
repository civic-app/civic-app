import { call, put, select, takeLatest } from 'redux-saga/effects';
import {selectUserReference, writeResponsesToUserRef} from './lib/api'
import {getQuestionResponses,getQuestionKeys} from './redux/actions/Selectors'
import {writeSuccess,writeFailure} from './redux/actions/Actions_question'
import * as actionType from './redux/actions/ActionType';
import {getLoggedInUser} from '../../auth/selectors';

export function* writeToDatabaseSaga() {
  try{
    let arrayOfObjects = yield select(getQuestionResponses);
    let user = yield select(getLoggedInUser);
    let arrayOfKeys = yield select(getQuestionKeys);
    let refToDatabasePath = yield call(selectUserReference,"users",user.id,"responses");
    yield* arrayOfKeys.map(function* (item) {
      yield call(writeResponsesToUserRef,refToDatabasePath,item,arrayOfObjects[item])
    })
    yield put(writeSuccess())
  } catch(error){
    yield put(writeFailure(error))
  }
}

function* surveySaga() {
  yield takeLatest(actionType.WRITE_TO_DATABASE, writeToDatabaseSaga);
}

export default surveySaga;
