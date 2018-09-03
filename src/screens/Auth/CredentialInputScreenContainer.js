import { connect } from 'react-redux';
import CredentialInputScreen from './CredentialInputScreen';
import {
  getDuplicatePasswordInput,
  getEmailInput,
  getFormErrorMessage,
  getFormIsValid,
  getFormType,
  getIsLoggedIn,
  getPasswordInput,
  getShouldShowErrors,
} from '../../auth/selectors';
import {
  emailLogin,
  formTypes,
  register,
  switchFormType,
  updateEmail,
  updatePassword,
  updateDuplicatePassword,
  showErrors,
} from '../../auth/redux';
import { getApiErrorMessage, getIsLoading } from '../../UI/redux';

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
  formType: getFormType(state),
  email: getEmailInput(state),
  password: getPasswordInput(state),
  duplicatePassword: getDuplicatePasswordInput(state),
  formIsValid: getFormIsValid(state),
  isLoading: getIsLoading(state),
  errorMessage: getFormErrorMessage(state),
  apiErrorMessage: getApiErrorMessage(state),
  showErrors: getShouldShowErrors(state),
});

const mapDispatchToProps = dispatch => ({
  changeFormType: type => dispatch(switchFormType(type)),
  updateEmail: email => dispatch(updateEmail(email)),
  updatePassword: password => dispatch(updatePassword(password)),
  updateDuplicatePassword: dupPassword => dispatch(updateDuplicatePassword(dupPassword)),
  updateErrorVisibility: shouldShow => dispatch(showErrors(shouldShow)),
  emailLogin: () => dispatch(emailLogin()),
  register: () => dispatch(register()),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  onSubmit: () => {
    if (stateProps.formType === formTypes.LOGIN) {
      dispatchProps.emailLogin();
    } else if (stateProps.formType === formTypes.SIGN_UP) {
      dispatchProps.register();
    }
  },
  showErrors: !!stateProps.apiErrorMessage || stateProps.showErrors,
  errorMessage: stateProps.apiErrorMessage || stateProps.errorMessage,
});

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(CredentialInputScreen);

export default Container;
