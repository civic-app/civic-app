import { createSnapshot } from '../../util/tests';
import WelcomeScreen from '../WelcomeScreen';

describe('WelcomeScreen', () => {
  it('renders correctly', () => {
    const snapshot = createSnapshot(WelcomeScreen);
    expect(snapshot).toMatchSnapshot();
  });
});
