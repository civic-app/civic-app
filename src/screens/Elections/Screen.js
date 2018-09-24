import { getCandidate } from '../../candidate/redux/candidates'
import { getMatchPercent } from '../../match/selectors';
import { getIsFavorite } from '../../favorites/redux';
import { Category } from '../../favorites/models';

export const getCandidateData = (state, candidateId) => {
  const candidate = getCandidate(state, candidateId);
  const isFavorite = getIsFavorite(state, candidateId, Category.Candidates);
  const matchPercent = getMatchPercent(state, candidateId);
  return (
    candidate && {
      id: candidate.id,
      name: candidate.name,
      image: candidate.image,
      electionIds: candidate.electionIds,
      isFavorite,
      matchPercent,
    }
  );
};
