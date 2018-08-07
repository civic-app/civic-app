import { getCandidate } from '../../candidate/redux/candidates';

export const getCandidateSummary = (state, candidateId) => {
  const candidate = getCandidate(state, candidateId);
  return candidate && {
    name: candidate.name,
    imageURI: candidate.image,
    isFavorite: true,
    partyPreference: candidate.partyPreference,
  };
};
