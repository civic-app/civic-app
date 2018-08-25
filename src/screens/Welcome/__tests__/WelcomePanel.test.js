import { createSnapshot } from '../../../util/tests';
import WelcomePanel from '../WelcomePanel';
import { formTypes } from '../../../auth/redux/formReducer';

describe('WelcomePanel', () => {
  it('renders correctly in initial view', () => {
    const props = {
      formType: formTypes.INITIAL,
      switchFormType: jest.fn(),
      navigate: jest.fn(),
    };
    const snapshot = createSnapshot(WelcomePanel, props);
    expect(snapshot).toMatchSnapshot();
  });

  it('renders correctly in login view', () => {
    const props = {
      formType: formTypes.LOGIN,
      switchFormType: jest.fn(),
      navigate: jest.fn(),
    };
    const snapshot = createSnapshot(WelcomePanel, props);
    expect(snapshot).toMatchSnapshot();
  });
  it('renders correctly in sign up view', () => {
    const props = {
      formType: formTypes.SIGN_UP,
      switchFormType: jest.fn(),
      navigate: jest.fn(),
    };
    const snapshot = createSnapshot(WelcomePanel, props);
    expect(snapshot).toMatchSnapshot();
  });
});
