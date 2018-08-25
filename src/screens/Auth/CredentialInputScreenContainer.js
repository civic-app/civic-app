import { connect } from 'react-redux';
import CredentialInputScreen from './CredentialInputScreen';
import {
  getFormType,
  getEmailInput,
  getPasswordInput,
  getDuplicatePasswordInput,
  getFormErrorMessage,
} from '../../auth/redux/selectors';
import { switchFormType, updateEmail, updatePassword, updateDuplicatePassword } from '../../auth/redux/formReducer';

const mapStateToProps = state => ({
  formType: getFormType(state),
  email: getEmailInput(state),
  password: getPasswordInput(state),
  duplicatePassword: getDuplicatePasswordInput(state),
  errorMessage: getFormErrorMessage(state),
});

const mapDispatchToProps = dispatch => ({
  changeFormType: type => dispatch(switchFormType(type)),
  updateEmail: email => dispatch(updateEmail(email)),
  updatePassword: password => dispatch(updatePassword(password)),
  updateDuplicatePassword: dupPassword => dispatch(updateDuplicatePassword(dupPassword)),
});

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CredentialInputScreen);

export default Container;
