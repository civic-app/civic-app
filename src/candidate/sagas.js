import { call, put, all } from 'redux-saga/effects';
import { fetchCandidatePositions, fetchCandidates } from './api';
import { loadCandidatesSuccess } from './redux/candidates';

// TODO: this should eventually probably only load the candidates for the user's eligible elections
export const loadCandidatesSaga = function*() {
  try {
    const [candidates, positions] = yield all([
      call(fetchCandidates),
      call(fetchCandidatePositions),
    ]);
    yield put(loadCandidatesSuccess({ candidates, positions }));
  } catch (err) {
    // TODO: handle error
  }
};
