import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCandidateSummary } from './viewSelectors';
import CandidateDetail from './CandidateDetail';
import { toggleFavorite } from '../../favorites/redux';

const Container = connect(
  (state, ownProps) => ({
    summary: getCandidateSummary(state, ownProps.candidateId),
  }),
  { toggleFavorite },
)(CandidateDetail);

Container.PropTypes = {
  candidateId: PropTypes.string,
};

export default Container;