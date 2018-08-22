import { getCandidate } from '../../candidate/redux/candidates';
import { getIsFavorite } from '../../favorites/redux';
import { Category } from '../../favorites/models';

export const getCandidateSummary = (state, candidateId) => {
  const candidate = getCandidate(state, candidateId);
  const isFavorite = getIsFavorite(state, candidateId, Category.Candidates);
  const matchPercent = 98 // TODO
  return candidate && {
    id: candidate.id,
    name: candidate.name,
    imageURI: candidate.image,
    positions: candidate.electionIds,
    partyPreference: candidate.partyPreference,
    isFavorite,
    matchPercent,
  };
};
