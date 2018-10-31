import { setByPath, deleteByPath } from '../firebase';
import { Category } from './models';

export const updateFavorite = (userId, favoriteId, isFavorite, category) => {
  const path = `users/${userId}/favorites/${category}/${favoriteId}`;
  return isFavorite ? setByPath(path, isFavorite) : deleteByPath(path);
};

export const toFavorites = (apiFavorites = {}) => ({
  [Category.Candidates]: definedToArray(apiFavorites[Category.Candidates]),
  [Category.Events]: definedToArray(apiFavorites[Category.Events]),
});

const definedToArray = (obj = {}) => Object.keys(obj).filter(key => !!key);
