import { connect } from 'react-redux';
import { switchFormType } from '../../auth/redux';
import { getFormType, getIsLoggedIn } from '../../auth/selectors';
import { getIsSmallScreen } from '../../UI/redux';
import { getUserHasTakenSurvey } from '../../match/selectors';
import { getUserHasDistrict } from '../../user/selectors';
import WelcomeScreen from './WelcomeScreen';
import WithAuthentication from '../../util/components/WithAuthentication';

const mapStateToProps = state => ({
  formType: getFormType(state),
  isSmallScreen: getIsSmallScreen(state),
  isLoggedIn: getIsLoggedIn(state),
  hasTakenSurvey: getUserHasTakenSurvey(state),
  hasDistrict: getUserHasDistrict(state),
});

const mapDispatchToProps = dispatch => ({ changeFormType: type => dispatch(switchFormType(type)) });

const ScreenWithAuthentication = WithAuthentication('login')(WelcomeScreen);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScreenWithAuthentication);
