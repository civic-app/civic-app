import { connect } from 'react-redux';
import { switchFormType } from '../../auth/redux';
import { getFormType, getIsLoggedIn } from '../../auth/selectors';
import { getIsSmallScreen } from '../../UI/redux';
import WelcomeScreen from './WelcomeScreen';
import WithAuthentication from '../../util/components/WithAuthentication';

const mapStateToProps = state => ({
  formType: getFormType(state),
  isSmallScreen: getIsSmallScreen(state),
  isLoggedIn: getIsLoggedIn(state),
});

const mapDispatchToProps = dispatch => ({ changeFormType: type => dispatch(switchFormType(type)) });

const ScreenWithAuthentication = WithAuthentication('login')(WelcomeScreen);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScreenWithAuthentication);
