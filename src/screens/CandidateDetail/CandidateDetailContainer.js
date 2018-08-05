import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleFavorite } from '../../candidate/redux/candidates';
import { getCandidateSummary } from './viewSelectors';
import CandidateDetail from './CandidateDetail';

const Container = connect(
  (state, ownProps) => ({
    summary: getCandidateSummary(state, ownProps.candidateId),
  }),
  { toggleFavorite },
)(CandidateDetail);

CandidateDetail.PropTypes = {
  candidateId: PropTypes.string,
}

export default Container;
