import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import Screen from './Screen';
import { getCandidates, loadCandidates } from '../../candidate/redux/candidates';
import { getIsLoggedIn } from '../../auth/selectors';
import { loadFavorites } from '../../favorites/redux';
import WithAuthentication from '../../util/components/WithAuthentication';

const ScreenWithAuthentication = WithAuthentication('logout')(Screen);

const Container = compose(
  connect(
    state => ({ candidates: getCandidates(state, toListCandidateMapperPlaceholder), isLoggedIn: getIsLoggedIn(state) }),
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

const toListCandidateMapperPlaceholder = candidate => ({ name: candidate.name, id: candidate.id });
