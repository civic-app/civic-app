import { takeEvery } from 'redux-saga/effects';
import { loadCandidatesSaga, toggleFavoriteSaga } from '../../candidate/sagas';
import { CandidateActionType } from '../../candidate/redux/candidates';

export default function*() {
  yield takeEvery(CandidateActionType.Request, loadCandidatesSaga);
  yield takeEvery(CandidateActionType.ToggleFavorite, toggleFavoriteSaga);
}
