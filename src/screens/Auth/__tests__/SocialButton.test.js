import { createSnapshot } from '../../../util/tests';
import SocialButton from '../SocialButton';

describe('SocialButton', () => {
  it('renders correctly', () => {
    const snapshot = createSnapshot(SocialButton, { title: 'Sign In with Email', onPress: jest.fn() });
    expect(snapshot).toMatchSnapshot();
  });
});
