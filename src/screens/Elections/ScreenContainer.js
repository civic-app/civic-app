import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, lifecycle } from 'recompose'
import Screen from './Screen'
import { getCandidates, loadCandidates, getCandidate } from '../../candidate/redux/candidates'
import { loadFavorites, getIsFavorite,toggleFavorite, FAVORITES_NAMESPACE } from '../../favorites/redux';
import { Category } from '../../favorites/models';

export const getFavoriteCandidateData  = (state) => {
  const candidates = getCandidates(state,toListCandidateMapperPlaceholder);
  return candidates
}


const toListCandidateMapperPlaceholder = candidate => ({
  name: candidate.name, 
  id: candidate.id,
  image: candidate.image,
  electionIds:candidate.electionIds,
  partyPreference: candidate.partyPreference,

})