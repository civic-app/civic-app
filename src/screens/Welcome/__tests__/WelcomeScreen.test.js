import { createSnapshot } from '../../../util/tests';
import WelcomeScreen from '../WelcomeScreen';

describe('WelcomeScreen', () => {
  it('renders correctly', () => {
    const props = {
      formType: 'foo',
      switchFormType: jest.fn(),
      navigation: {},
    };
    const snapshot = createSnapshot(WelcomeScreen.WrappedComponent, props);
    expect(snapshot).toMatchSnapshot();
  });
});
