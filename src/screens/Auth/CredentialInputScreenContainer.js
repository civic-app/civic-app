import { connect } from 'react-redux';
import CredentialInputScreen from './CredentialInputScreen';
import {
  getFormType,
  getEmailInput,
  getPasswordInput,
  getDuplicatePasswordInput,
  getFormErrorMessage,
  getFormIsValid,
  getShouldShowErrors,
} from '../../auth/redux/selectors';
import {
  switchFormType,
  updateEmail,
  updatePassword,
  updateDuplicatePassword,
  showErrors,
} from '../../auth/redux/formReducer';
import { emailLogin } from '../../auth/redux/userReducer';
import { getIsLoading } from '../../UI/redux';

const mapStateToProps = state => ({
  formType: getFormType(state),
  email: getEmailInput(state),
  password: getPasswordInput(state),
  duplicatePassword: getDuplicatePasswordInput(state),
  formIsValid: getFormIsValid(state),
  isLoading: getIsLoading(state),
  errorMessage: getFormErrorMessage(state),
  showErrors: getShouldShowErrors(state),
});

const mapDispatchToProps = dispatch => ({
  changeFormType: type => dispatch(switchFormType(type)),
  updateEmail: email => dispatch(updateEmail(email)),
  updatePassword: password => dispatch(updatePassword(password)),
  updateDuplicatePassword: dupPassword => dispatch(updateDuplicatePassword(dupPassword)),
  updateErrorVisibility: shouldShow => dispatch(showErrors(shouldShow)),
  onSubmit: () => dispatch(emailLogin()),
});

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CredentialInputScreen);

export default Container;
