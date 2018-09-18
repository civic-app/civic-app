import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import FavoritesPreview from './FavoritesPreview';
import WithAuthentication from '../../util/components/WithAuthentication';
import { getCandidates, loadCandidates } from '../../candidate/redux/candidates'
import { loadFavorites } from '../../favorites/redux';
import { getIsLoggedIn } from '../../auth/selectors';

export const getFavoriteCandidateData  = state => {
  return getCandidates(state,toListCandidateMapper);
};

const ScreenWithAuthentication = WithAuthentication('logout')(FavoritesPreview);

const Container = compose(
  connect(
    (state, ownprops) => ({
      data: getFavoriteCandidateData(state, ownprops.candidateId),
      isLoggedIn: getIsLoggedIn(state),
    }),
    { loadCandidates, loadFavorites },
  ),
  lifecycle({
    componentDidMount() {
      this.props.loadCandidates();
      this.props.loadFavorites();
    },
  }),
)(ScreenWithAuthentication);

export default Container;

const toListCandidateMapper = candidate => ({
  name: candidate.name,
  id: candidate.id,
  image: candidate.image,
  electionIds: candidate.electionIds,
  partyPreference: candidate.partyPreference,
});
