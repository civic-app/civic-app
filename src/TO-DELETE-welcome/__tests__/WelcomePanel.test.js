import { createSnapshot } from '../../util/tests';
import WelcomePanel from '../WelcomePanel';

describe('WelcomePanel', () => {
  it('renders correctly', () => {
    const snapshot = createSnapshot(WelcomePanel);
    expect(snapshot).toMatchSnapshot();
  });
});
