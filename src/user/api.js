import { getByPath, setByPath } from '../firebase';
import { toFavorites } from '../favorites/api';

export const fetchUser = id => getByPath(`users/${id}`).then(toUser);

const toUser = apiUser => ({
  ...apiUser,
  favorites: apiUser.favorites && toFavorites(apiUser.favorites),
});

export const putDistrict = (userId, district) => setByPath(`users/${userId}/district`, district);

export const putUserRegistered = (userId, isRegisteredToVote) =>
  setByPath(`users/${userId}/isRegisteredToVote`, isRegisteredToVote);
