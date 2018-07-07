import { connect } from 'react-redux';
import { toggleFavorite } from './redux/candidates';
import { getCandidateSummary } from './viewSelectors';
import CandidateDetail from './CandidateDetail';

const Container = connect(
  (state, ownProps) => ({
    summary: getCandidateSummary(state, ownProps.candidateId),
  }),
  { toggleFavorite },
)(CandidateDetail);

export default Container;
