import { takeEvery } from 'redux-saga/effects';
import { loadCandidatesSaga } from '../../candidate/sagas';
import { CandidateActionType } from '../../candidate/redux/candidates';
import { loadFavoritesSaga, toggleFavoriteSaga } from '../../favorites/sagas';
import { FavoritesActionType } from '../../favorites/redux';

export default function*() {
  yield takeEvery(CandidateActionType.Request, loadCandidatesSaga);
  yield takeEvery(FavoritesActionType.Request, loadFavoritesSaga);
  yield takeEvery(FavoritesActionType.Toggle, toggleFavoriteSaga);
}
