import { createConnectedSnapshot } from '../../util/tests';
import WelcomeScreen from '../WelcomeScreen';

describe('WelcomeScreen', () => {
  it('renders correctly', () => {
    const snapshot = createConnectedSnapshot(WelcomeScreen);
    expect(snapshot).toMatchSnapshot();
  });
});
