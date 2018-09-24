import { getByPath } from '../firebase';
import { toFavorites } from '../favorites/api';

export const fetchUser = (id) => (
  getByPath(`users/${id}`)
    .then(toUser)
);

const toUser = (apiUser) => ({
  ...apiUser,
  favorites: apiUser.favorites && toFavorites(apiUser.favorites),
});
