import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, lifecycle } from 'recompose'
import CandidatePreview from './CandidatePreview'
import { getCandidates, loadCandidates } from '../../candidate/redux/candidates'
import { loadFavorites } from '../../favorites/redux';

const Container = compose(
  connect(
    (state) => ({
      candidates: getCandidates(state, toListCandidateMapperPlaceholder
      )}
    ),
    { loadCandidates, loadFavorites }
  ),
  lifecycle({
    componentDidMount() {
      this.props.loadCandidates();
      this.props.loadFavorites();
    }
  })
)(CandidatePreview);

Container.PropTypes = {
  candidateId: PropTypes.string,
};

export default Container;

const toListCandidateMapperPlaceholder = candidate => ({ name: candidate.name, id: candidate.id, image: candidate.image })

//const toFavoriteMapperPlaceholder = candidate => ({name: candidate.name, id: candidate.id, isFavorite })

