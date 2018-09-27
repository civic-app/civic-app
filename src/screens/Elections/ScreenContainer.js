import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { getCandidates, loadCandidates } from '../../candidate/redux/candidates';
import { loadUser } from '../../user/redux'
import { getIsLoggedIn } from '../../auth/selectors';
import WithAuthentication from '../../util/components/WithAuthentication';
import Screen from './Screen';

const ScreenWithAuthentication = WithAuthentication('logout')(Screen);

const Container = compose(
  connect(
    state => ({
      candidates: getCandidates(state, toListCandidateMapperPlaceholder),
      isLoggedIn: getIsLoggedIn(state),
    }),
    { loadCandidates, loadUser },
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

const toListCandidateMapperPlaceholder = candidate => ({ name: candidate.name, id: candidate.id });
