import { getCandidates } from '../../candidate/redux/candidates'
import { getMatchPercent } from '../../match/selectors';
import { getIsFavorite } from '../../favorites/redux';
import { Category } from '../../favorites/models';

export const getFavoriteCandidateData  = (state) => {
  const candidates = getCandidates(state,toListCandidateMapperPlaceholder);
  return candidates
}
export const getFavorite = (state,candidateId) => {
  const isFavorite = getIsFavorite(state, candidateId, Category.Candidates);
  return isFavorite
}
export const matchPercent = (state,candidateId) => {
  const match = getMatchPercent(state, candidateId);
  return match
}

const toListCandidateMapperPlaceholder = candidate => ({
  name: candidate.name, 
  id: candidate.id,
  image: candidate.image,
  electionIds:candidate.electionIds,
})
