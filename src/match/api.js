import { setByPath } from '../firebase/initialize';

// newResponses should be an object: { [questionId]: { ...response values }
export const saveUserResponses = (userId, newResponses) => (
  setByPath(`users/${userId}/responses`, newResponses)
);
