import isNil from 'lodash/isNil';
import { USER_NAMESPACE } from './redux';

export const getUserDistrict = state => state[USER_NAMESPACE].district;
export const getUserHasDistrict = state => !isNil(getUserDistrict(state));
