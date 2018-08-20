import { createSnapshot } from '../../../util/tests';
import SocialButton from '../SocialButton';

describe('SocialButton', () => {
  it('email renders correctly', () => {
    const snapshot = createSnapshot(SocialButton, { type: 'email', title: 'Sign In with Email' });
    expect(snapshot).toMatchSnapshot();
  });
  it('facebook renders correctly', () => {
    const snapshot = createSnapshot(SocialButton, { type: 'facebook', title: 'Continue with Facebook' });
    expect(snapshot).toMatchSnapshot();
  });
  it('google renders correctly', () => {
    const snapshot = createSnapshot(SocialButton, { type: 'google', title: 'Sign In with Google' });
    expect(snapshot).toMatchSnapshot();
  });
});
