import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import FavoritesPreview from './FavoritesPreview';
import WithAuthentication from '../../util/components/WithAuthentication';
import { getFilteredCandidates, loadCandidates } from '../../candidate/redux/candidates'
import { loadUser } from '../../user/redux'
import { getIsLoggedIn } from '../../auth/selectors';
import { getFavoritesForCategory } from '../../favorites/redux';
import { Category } from '../../favorites/models';
import {Platform} from 'react-native';
import flatMap from 'lodash/flatMap'
import uniq from 'lodash/uniq';

export const getFavoriteCandidateData   = (state) => {
  const favoriteCandidateIds = getFavoritesForCategory(state,[Category.Candidates])
  return Platform.OS !== 'android' ? 
    getFilteredCandidates(state, toListCandidateMapper, favoriteCandidateIds) 
    : 
    flatMap(favoriteCandidateIds._map._mapData, (candidate) => {
      return getFilteredCandidates(state, toListCandidateMapper, uniq(candidate))
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
