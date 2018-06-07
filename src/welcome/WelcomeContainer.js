import { connect } from 'react-redux'
import { getIsLoggedIn, logIn, logOut, register } from '../auth/redux'
import Welcome from './Welcome'

const Container = connect(
  state => ({ isLoggedIn: getIsLoggedIn(state) }),
  { logIn, logOut, register }
)(Welcome)

export default Container
