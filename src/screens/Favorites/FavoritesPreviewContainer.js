import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import FavoritesPreview from './FavoritesPreview';
import WithAuthentication from '../../util/components/WithAuthentication';
import { getFilteredCandidates, loadCandidates } from '../../candidate/redux/candidates'
import { loadUser } from '../../user/redux'
import { getIsLoggedIn } from '../../auth/selectors';
import { getFavoritesForCategory } from '../../favorites/redux';
import { Category } from '../../favorites/models';
var _ = require('lodash');

export const getFavoriteCandidateData   = (state) => {
  const favoriteCandidateIds = getFavoritesForCategory(state,[Category.Candidates])
  return _.flatMap(favoriteCandidateIds._map._mapData, (candidate) => {
    return getFilteredCandidates(state, toListCandidateMapper, _.uniq(candidate))
  })
}

const ScreenWithAuthentication = WithAuthentication('logout')(FavoritesPreview);

const Container = compose(
  connect(
    (state) => ({
      data: getFavoriteCandidateData(state),
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
