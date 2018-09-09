import { getByPath } from '../firebase';

export const fetchCandidates = () => getByPath('candidates');
