import { getCandidate } from '../../candidate/redux/candidates';
import { getIsFavorite } from '../../favorites/redux';
import { Category } from '../../favorites/models';

export const getCandidateSummary = (state, candidateId) => {
  const candidate = getCandidate(state, candidateId);
  const isFavorite = getIsFavorite(state, candidateId, Category.Candidates);
  return candidate && {
    name: candidate.name,
    imageURI: candidate.image,
    isFavorite,
    partyPreference: candidate.partyPreference,
    id: candidate.id,
  };
};
