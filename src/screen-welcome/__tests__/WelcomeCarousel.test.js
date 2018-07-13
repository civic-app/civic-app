import { createSnapshot } from '../../util/tests';
import WelcomeCarousel from '../WelcomeCarousel';

describe('WelcomeCarousel', () => {
  it('renders correctly', () => {
    const snapshot = createSnapshot(WelcomeCarousel);
    expect(snapshot).toMatchSnapshot();
  });
});
