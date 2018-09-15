import { createSnapshot } from '../../../util/tests';
import GoogleAuthButton from '../GoogleAuthButton';

describe('GoogleAuthButton', () => {
  it('renders correctly', () => {
    const snapshot = createSnapshot(GoogleAuthButton.WrappedComponent, {
      title: 'sign in with google',
      onPress: jest.fn(),
    });
    expect(snapshot).toMatchSnapshot();
  });
});
