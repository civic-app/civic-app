import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, lifecycle } from 'recompose'
import FavoritesPreview from './FavoritesPreview'
import { getCandidates, loadCandidates, getCandidate } from '../../candidate/redux/candidates'
import { loadFavorites, getIsFavorite,toggleFavorite } from '../../favorites/redux';
import { Category } from '../../favorites/models';

export const getFavoriteCandidateData  = (state) => {
  const candidates = getCandidates(state,toListCandidateMapper);
  var isFavorite = candidates.map(candidate => {getIsFavorite(state,candidate.id,Category.Candidates)}) 
  return candidates   
}

const Container = compose(
  connect(
    (state,ownprops) => ({
      data: getFavoriteCandidateData(state,ownprops.candidateId)}),
      {loadCandidates,loadFavorites}
    ),  
    lifecycle({
      componentDidMount() {
        this.props.loadCandidates();
        this.props.loadFavorites();
      }
    })
)(FavoritesPreview)

export default Container;

const toListCandidateMapper = candidate => ({
  name: candidate.name, 
  id: candidate.id,
  image: candidate.image,
  electionIds:candidate.electionIds,
  partyPreference: candidate.partyPreference,
 
})