import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, lifecycle } from 'recompose'
import CandidatePreview from './CandidatePreview'
import { getCandidates, loadCandidates } from '../../candidate/redux/candidates'
import { loadFavorites, getIsFavorite } from '../../favorites/redux';
import { Category } from '../../favorites/models';

export const getFavoriteCandidateData  = (state) => {
  const candidates = getCandidates(state,toListCandidateMapper);
  return candidates.map(candidate => {getIsFavorite(state,candidate.id,Category.Candidates)});
};

const Container = compose(
  connect(
    (state, ownprops) => ({
      data: getFavoriteCandidateData(state,ownprops.candidateId)}
    ),
    { loadCandidates,loadFavorites },
  ),
  lifecycle({
    componentDidMount() {
      this.props.loadCandidates();
      this.props.loadFavorites();
    }
  })
)(CandidatePreview);

Container.PropTypes = {
  candidateId: PropTypes.string,
};

export default Container;

const toListCandidateMapper = candidate => ({
  name: candidate.name,
  id: candidate.id,
  image: candidate.image,
  electionIds:candidate.electionIds,
  partyPreference: candidate.partyPreference,
});
