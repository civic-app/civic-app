import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { getCandidates, loadCandidates } from '../candidate/redux/candidates'
import { loadFavorites } from '../favorites/redux';
import {CandidateDetail} from '../screens/CandidateDetail/'

const Container = compose(
  connect(
    state => ({ candidates: getCandidates(state, toListCandidateMapperPlaceholder)}),
    { loadCandidates, loadFavorites }
  ),
  lifecycle({
    componentDidMount() {
      this.props.loadCandidates();
      this.props.loadFavorites();
    }
  })
)(CandidateDetail);

export default Container

const toListCandidateMapperPlaceholder = candidate => ({ name: candidate.name, id: candidate.id })
