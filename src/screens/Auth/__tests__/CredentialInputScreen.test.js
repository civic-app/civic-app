import { createSnapshot } from '../../../util/tests';
import CredentialInputScreen from '../CredentialInputScreen';
import { formTypes } from '../../../auth/redux';

describe('CredentialInputScreen', () => {
  it('renders correctly in login mode', () => {
    const props = {
      isLoggedIn: false,
      navigation: { navigate: jest.fn() },
      formType: formTypes.LOGIN,
      onSubmit: jest.fn(),
      changeFormType: jest.fn(),
      formIsValid: true,
      email: 'foo@bar.com',
      updateEmail: jest.fn(),
      password: 'password',
      updatePassword: jest.fn(),
      isLoading: false,
      errorMessage: '',
      updateErrorVisibility: jest.fn(),
      showErrors: false,
      duplicatePassword: 'password',
      updateDuplicatePassword: jest.fn(),
    };
    const snapshot = createSnapshot(CredentialInputScreen, props);
    expect(snapshot).toMatchSnapshot();
  });
  it('renders correctly in sign up mode', () => {
    const props = {
      isLoggedIn: false,
      navigation: { navigate: jest.fn() },
      formType: formTypes.SIGN_UP,
      onSubmit: jest.fn(),
      changeFormType: jest.fn(),
      formIsValid: true,
      email: 'foo@bar.com',
      updateEmail: jest.fn(),
      password: 'password',
      updatePassword: jest.fn(),
      isLoading: false,
      errorMessage: '',
      updateErrorVisibility: jest.fn(),
      showErrors: false,
      duplicatePassword: 'password',
      updateDuplicatePassword: jest.fn(),
    };
    const snapshot = createSnapshot(CredentialInputScreen, props);
    expect(snapshot).toMatchSnapshot();
  });
  it('renders correctly with form error', () => {
    const props = {
      isLoggedIn: false,
      navigation: { navigate: jest.fn() },
      formType: formTypes.LOGIN,
      onSubmit: jest.fn(),
      changeFormType: jest.fn(),
      formIsValid: false,
      email: '',
      updateEmail: jest.fn(),
      password: 'password',
      updatePassword: jest.fn(),
      isLoading: false,
      errorMessage: 'Email required',
      updateErrorVisibility: jest.fn(),
      showErrors: true,
    };
    const snapshot = createSnapshot(CredentialInputScreen, props);
    expect(snapshot).toMatchSnapshot();
  });
  it('renders correctly when loading', () => {
    const props = {
      isLoggedIn: false,
      navigation: { navigate: jest.fn() },
      formType: formTypes.LOGIN,
      onSubmit: jest.fn(),
      changeFormType: jest.fn(),
      formIsValid: true,
      email: 'email@email.com',
      updateEmail: jest.fn(),
      password: 'password',
      updatePassword: jest.fn(),
      isLoading: true,
      errorMessage: '',
      updateErrorVisibility: jest.fn(),
      showErrors: false,
    };
    const snapshot = createSnapshot(CredentialInputScreen, props);
    expect(snapshot).toMatchSnapshot();
  });
});
