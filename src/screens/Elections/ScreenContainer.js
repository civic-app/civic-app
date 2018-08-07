import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import Screen from './Screen'
import { getCandidates, loadCandidates } from '../../candidate/redux/candidates'

const Container = compose(
  connect(
    state => ({ candidates: getCandidates(state, toListCandidateMapperPlaceholder)}),
    { loadCandidates }
  ),
  lifecycle({
    componentDidMount() {
      this.props.loadCandidates();
    }
  })
)(Screen);

export default Container

const toListCandidateMapperPlaceholder = candidate => ({ name: candidate.name, id: candidate.id })
