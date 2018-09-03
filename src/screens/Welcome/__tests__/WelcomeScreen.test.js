import { createSnapshot } from '../../../util/tests';
import WelcomeScreen from '../WelcomeScreen';

describe('WelcomeScreen', () => {
  it('renders correctly', () => {
    const props = {
      formType: 'foo',
      changeFormType: jest.fn(),
      navigation: { navigate: jest.fn() },
      isSmallScreen: false,
    };
    const snapshot = createSnapshot(WelcomeScreen.WrappedComponent, props);
    expect(snapshot).toMatchSnapshot();
  });
});
