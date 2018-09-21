import { takeEvery } from 'redux-saga/effects';
import { loadCandidatesSaga } from '../../candidate/sagas';
import { CandidateActionType } from '../../candidate/redux/candidates';
import { toggleFavoriteSaga } from '../../favorites/sagas';
import { FavoritesActionType } from '../../favorites/redux';

export default function*() {
  yield takeEvery(CandidateActionType.Request, loadCandidatesSaga);
  yield takeEvery(FavoritesActionType.Toggle, toggleFavoriteSaga);
}
