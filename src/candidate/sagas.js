import { call, put } from 'redux-saga/effects';
import { fetchCandidates } from './api';
import { loadCandidatesSuccess } from './redux/candidates';

// TODO: this should eventually probably only load the candidates for the user's eligible elections
export const loadCandidatesSaga = function*() {
  try {
    const candidates = yield call(fetchCandidates);
    yield put(loadCandidatesSuccess(candidates));
  } catch (err) {
    // TODO: handle error
  }
};
