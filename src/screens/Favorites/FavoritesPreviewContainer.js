import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import FavoritesPreview from './FavoritesPreview';
import WithAuthentication from '../../util/components/WithAuthentication';
import { getFilteredCandidates, loadCandidates } from '../../candidate/redux/candidates'
import { loadUser } from '../../user/redux'
import { getIsLoggedIn } from '../../auth/selectors';
import { getUserFavorites } from '../../favorites/redux';
import { Category } from '../../favorites/models';

export const getFavoriteCandidateData  = (state) => {
  const favoriteCandidateIds = getUserFavorites(state)[Category.Candidates];
  return getFilteredCandidates(state, toListCandidateMapper, favoriteCandidateIds);
};

const ScreenWithAuthentication = WithAuthentication('logout')(FavoritesPreview);

const Container = compose(
  connect(
    (state, ownprops) => ({
      data: getFavoriteCandidateData(state, ownprops.candidateId),
      isLoggedIn: getIsLoggedIn(state),
    }),
    { loadCandidates, loadUser },
  ),
  lifecycle({
    componentDidMount() {
      // TODO: only load if not already loaded
      this.props.loadCandidates();
      this.props.loadUser();
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
