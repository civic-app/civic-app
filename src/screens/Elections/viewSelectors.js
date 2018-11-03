import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { getCertaintyPercent, getMatchPercent, shouldShowMatchPercent } from '../../match/selectors';
import { getIsFavorite } from '../../favorites/redux';
import { Category } from '../../favorites/models';
import { getCandidate, getCandidates, loadCandidates } from '../../candidate/redux/candidates';
import { loadUser } from '../../user/redux';
import { getIsLoggedIn } from '../../auth/selectors';
import { saveUserRegistered } from '../../user/redux';
import { getUserRegistered } from '../../user/selectors';
import WithAuthentication from '../../util/components/WithAuthentication';
import Elections from './ScreenContainer';

export const getElectionsViewProps = state => {
  const candidates = getCandidates(state, toListCandidateMapperPlaceholder).filter(
    candidate => candidate.id != 'placeholder',
  );
  const electionIds = candidates.map(candidate => candidate.electionIds[0]);
  const distinctElectionIds = electionIds.filter((elem, pos, arr) => {
    return arr.indexOf(elem) == pos;
  });
  const electionCandidates = distinctElectionIds.map(electionIds => ({
    electionIds,
    candidates: candidates.filter(candidate => candidate.electionIds[0] === electionIds),
  }));
  return { electionCandidates };
};

export const getCandidateData = (state, candidateId) => {
  const candidate = getCandidate(state, candidateId);
  const isFavorite = getIsFavorite(state, candidateId, Category.Candidates);
  const matchPercent = getMatchPercent(state, candidateId);
  const shouldShowMatch = shouldShowMatchPercent(state, candidateId);
  return (
    candidate && {
      id: candidate.id,
      name: candidate.name,
      image: candidate.image,
      electionIds: candidate.electionIds,
      isFavorite,
      matchPercent,
      shouldShowMatch,
    }
  );
};

const ScreenWithAuthentication = WithAuthentication('logout')(Elections);

const Container = compose(
  connect(
    state => ({
      isLoggedIn: getIsLoggedIn(state),
      electionCandidates: getElectionsViewProps(state),
      isUserRegistered: getUserRegistered(state),
    }),
    { loadCandidates, loadUser, saveUserRegistered },
  ),
  lifecycle({
    componentDidMount() {
      this.props.loadCandidates();
      // TODO: only load user if match data has not been loaded yet
      this.props.loadUser();
    },
  }),
)(ScreenWithAuthentication);

export default Container;

const toListCandidateMapperPlaceholder = candidate => ({ id: candidate.id, electionIds: candidate.electionIds });
