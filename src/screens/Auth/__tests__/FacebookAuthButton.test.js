import { createSnapshot } from '../../../util/tests';
import FacebookAuthButton from '../GoogleAuthButton';

describe('FacebookAuthButton', () => {
  it('renders correctly', () => {
    const snapshot = createSnapshot(FacebookAuthButton.WrappedComponent, {
      title: 'continue with facebook',
      onPress: jest.fn(),
    });
    expect(snapshot).toMatchSnapshot();
  });
});
