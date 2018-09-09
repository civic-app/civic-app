import { getByPath, setByPath } from '../firebase';
import { Category } from './models';

export const updateFavorite = (userId, favoriteId, isFavorite, category) =>
  setByPath(`favorites/${userId}/${category}/${favoriteId}`, isFavorite);

export const fetchFavorites = userId => getByPath(`favorites/${userId}`).then(toFavorites);

export const toFavorites = apiFavorites => ({
  [Category.Candidates]: definedToArray(apiFavorites[Category.Candidates]),
  [Category.Events]: definedToArray(apiFavorites[Category.Events]),
});

const definedToArray = (obj = {}) => Object.keys(obj).filter(key => !!key);
