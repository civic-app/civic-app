import { call, put } from 'redux-saga/effects';
import { fetchCandidates } from './api';
import { loadCandidatesSuccess, toggleFavoriteSuccess } from './redux/candidates';

// TODO: this should eventually probably only load the candidates for the user's eligible elections
export const loadCandidatesSaga = function*() {
  try {
    const candidates = yield call(fetchCandidates);
    yield put(loadCandidatesSuccess(candidates));
  } catch (err) {
    // handle error
  }
};

export const toggleFavoriteSaga = function*() {
  try {
    yield(call(toggleFavoriteSuccess('foo', true)))
  } catch (err) {
    // handle error
  }
};
