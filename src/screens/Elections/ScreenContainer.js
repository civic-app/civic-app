import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, lifecycle } from 'recompose'
import Screen from './Screen'
import { getCandidates } from '../../candidate/redux/candidates'

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