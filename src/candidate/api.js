import { getByPath } from '../firebase/initialize';

export const fetchCandidates = () => (
  getByPath('candidates')
);
