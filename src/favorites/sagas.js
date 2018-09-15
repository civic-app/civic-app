import { call, select, put } from 'redux-saga/effects';
import { getLoggedInUserId } from '../auth/selectors';
import { favoritesRequestSuccess, getIsFavorite, addOrRemoveFavorite } from './redux';
import { fetchFavorites, updateFavorite } from './api';

export const toggleFavoriteSaga = function*(action) {
  try {
    const userId = yield select(getLoggedInUserId);
    const oldIsFavorite = yield select(getIsFavorite, action.payload.id, action.payload.category);
    yield put(addOrRemoveFavorite(action.payload.id, action.payload.category, !oldIsFavorite));
    yield call(updateFavorite, userId, action.payload.id, !oldIsFavorite, action.payload.category);
  } catch (err) {
    // TODO: display error message about failure
    yield put(addOrRemoveFavorite(action.payload.id, action.payload.category));
  }
};

export const loadFavoritesSaga = function*() {
  try {
    const userId = yield select(getLoggedInUserId);
    const favorites = yield call(fetchFavorites, userId);
    yield put(favoritesRequestSuccess(favorites));
  } catch (err) {
    // TODO: handle error
  }
};
