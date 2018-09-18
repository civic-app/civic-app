import { getByPath } from '../firebase/initialize';
import { toFavorites } from '../favorites/api';

export const fetchUser = (id) => (
  getByPath(`users/${id}`)
    .then(toUser)
);

const toUser = (apiUser) => ({
  ...apiUser,
  favorites: toFavorites(apiUser.favorites),
});
