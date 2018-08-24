import { connect } from 'react-redux';
import CredentialInputScreen from './CredentialInputScreen';
import { getFormType, switchFormType } from '../../auth/redux';

const mapStateToProps = state => ({
  formType: getFormType(state),
});

const mapDispatchToProps = dispatch => ({
  changeFormType: type => dispatch(switchFormType(type)),
});

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CredentialInputScreen);

export default Container;
